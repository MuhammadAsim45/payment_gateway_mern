import "./App.css";
import { useState } from "react";
import StipeCheckout from "react-stripe-checkout";
import axios from "axios";
function App() {
  const [product, setProduct] = useState({ price: 50, name: "product1" });
  const handlePayment = async (token) => {
    const response = await axios.post("http://localhost:8000/payment", {
      product,
      token,
    });
    const data = await response.json;
    console.log(data);
  };
  return (
    <div className="App">
      <h1>payment gateway integration </h1>
      <StipeCheckout
        name="payment"
        token={handlePayment}
        stripeKey="pk_test_51Kid5YEtOAaRk3yO6r0tzUW98fClNc7UcfzrpwVqvc34ECaFcizMawU6G2Wm42SkG7AuplKHcc2iV4UMlgsXIJko00nwWIvIdO"
      />
    </div>
  );
}

export default App;
