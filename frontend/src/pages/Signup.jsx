import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    signup(email, password, name)
  }

  return (
    <form className="max-w-[400px] mt-24 m-auto p-5 bg-white rounded" onSubmit={handleSubmit}>
      <h3 className="text-2xl font-semibold py-4 ">Sign Up</h3>

      <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
      />
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button className="mt-4 bg-blue-600 text-white font-bold  text-sm px-4 py-2 rounded shadow hover:bg-blue-700 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-[100%]">Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup