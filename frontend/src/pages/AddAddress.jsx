import React, { useState } from "react"
import { assets } from "../assets/assets.js"
import InputField from "../components/InputField.jsx"
import { useAppContext } from "../context/AppContext.jsx"
import toast from "react-hot-toast"
import { useEffect } from "react"

const AddAddress = () => {
  const {
    axios,
    user,
    navigate
  } = useAppContext()

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }))
  }

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault()

      const { data } = await axios.post("/api/address/add", { address })
      if (data.success) {
        toast.success(data.message)
        navigate("/cart")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (!user) {
      navigate("/cart")
    }
  })

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping {" "}
        <span className="font-semibold text-primary">
          Address
        </span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form
            onSubmit={onSubmitHandler}
            className="space-y-3 mt-6 text-sm"
          >
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="First Name"
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="Last Name"
                type="text"
                placeholder="Last Name"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="Email address"
              type="text"
              placeholder="Email address"
            />

            <InputField
              handleChange={handleChange}
              address={address}
              name="Street"
              type="text"
              placeholder="Street"
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="City"
                type="text"
                placeholder="City"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="State"
                type="text"
                placeholder="State"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="Zip Code"
                type="text"
                placeholder="Zip Code"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="Country"
                type="text"
                placeholder="Country"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="Phone"
              type="text"
              placeholder="Phone"
            />

            <button className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase">
              Save address
            </button>
          </form>
        </div>
        <img
          src={assets.add_address_image}
          alt="Add Address"
          className="md:mr-16 mb-16 md:mt-0"
        />
      </div>
    </div>
  )
}

export default AddAddress;
