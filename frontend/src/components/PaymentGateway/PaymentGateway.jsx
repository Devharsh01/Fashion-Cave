import React, { useState } from 'react'
import './PaymentGateway.css'

const PaymentGateway = ({changeCurrent}) => {
    const [selected, setSelected] = useState('cash')

    const changeHandler = (e) => {
        setSelected(e.target.value)
    }

    const BackButtonClick = () => {
        changeCurrent("address")
    }

    const ForwardButtonClick = () => {
        if(selected == "credit") {
            changeCurrent("paymentCard")
        }
        else if(selected == "cash") {
            changeCurrent("paymentCOD")
        }
    }

    return(
        <div>
            <div className="payment-container">
                <h1 className="payment-title">Payment method</h1>
                <label className={`payment-label ${selected === "cash" ? "label-selected" : ""}`}>
                    <div className="payment-icon">

                    <svg fill="currentColor" width="65px" height="65px" viewBox="0 -3 38 38" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>dollar1</title> <path d="M36.002 23.010l0.057-17.089-31.050 0.019-0.001-1.96h32.992v19.031l-1.998-0.001zM34.995 26.017l-1.997-0.002 0.057-17.089-31.050 0.020-0.001-1.96h32.992v19.031zM32.053 28.020h-32.053v-18.030h32.053v18.030zM30.049 11.931h-28.046v14.086h28.045v-14.086zM27.045 24.515c0 0.177 0.044 0.342 0.101 0.5h-11.12c2.766 0 5.009-2.69 5.009-6.010s-2.243-6.010-5.009-6.010h11.119c-0.057 0.158-0.101 0.323-0.101 0.501 0 0.83 0.672 1.502 1.502 1.502 0.178 0 0.343-0.044 0.501-0.101v8.215c-0.158-0.056-0.323-0.101-0.501-0.101-0.829 0.001-1.501 0.674-1.501 1.504zM25.041 16.919c-0.83 0-1.502 0.896-1.502 2.003s0.672 2.003 1.502 2.003 1.502-0.896 1.502-2.003-0.672-2.003-1.502-2.003zM18.123 15.394c0.015 0.029 0.027 0.068 0.037 0.116 0.011 0.048 0.018 0.109 0.021 0.182 0.005 0.073 0.007 0.164 0.007 0.273 0 0.121-0.003 0.224-0.009 0.307-0.007 0.084-0.018 0.153-0.031 0.207-0.016 0.055-0.036 0.095-0.062 0.119-0.027 0.025-0.064 0.038-0.11 0.038s-0.118-0.029-0.219-0.087c-0.101-0.059-0.224-0.121-0.369-0.189s-0.315-0.131-0.507-0.187-0.402-0.084-0.632-0.084c-0.18 0-0.336 0.021-0.469 0.065-0.134 0.044-0.246 0.104-0.335 0.181s-0.157 0.17-0.2 0.277c-0.044 0.108-0.066 0.223-0.066 0.343 0 0.18 0.049 0.335 0.147 0.467s0.229 0.248 0.395 0.35c0.165 0.103 0.352 0.198 0.56 0.288s0.421 0.185 0.638 0.284c0.217 0.101 0.43 0.214 0.639 0.342 0.209 0.127 0.395 0.279 0.557 0.456 0.163 0.178 0.295 0.386 0.395 0.626s0.15 0.522 0.15 0.848c0 0.425-0.080 0.799-0.238 1.119-0.158 0.321-0.373 0.59-0.645 0.805s-0.588 0.376-0.951 0.484c-0.046 0.014-0.096 0.020-0.143 0.031v1.094h-0.985v-0.965c-0.013 0-0.024 0.003-0.037 0.003-0.279 0-0.539-0.023-0.779-0.068s-0.452-0.101-0.635-0.164c-0.184-0.064-0.337-0.132-0.46-0.202s-0.212-0.132-0.266-0.186-0.093-0.132-0.116-0.234-0.035-0.25-0.035-0.442c0-0.129 0.004-0.238 0.013-0.325 0.008-0.088 0.022-0.159 0.041-0.214 0.019-0.054 0.044-0.093 0.075-0.116 0.031-0.022 0.068-0.034 0.109-0.034 0.059 0 0.141 0.034 0.248 0.104 0.106 0.068 0.243 0.145 0.41 0.228s0.366 0.159 0.598 0.228c0.231 0.069 0.5 0.104 0.804 0.104 0.2 0 0.38-0.024 0.538-0.072s0.293-0.116 0.404-0.203c0.11-0.088 0.194-0.197 0.253-0.326s0.088-0.274 0.088-0.433c0-0.184-0.051-0.342-0.15-0.473-0.1-0.132-0.23-0.248-0.391-0.351s-0.343-0.198-0.547-0.287c-0.205-0.090-0.415-0.185-0.632-0.285s-0.428-0.214-0.632-0.341c-0.204-0.127-0.387-0.279-0.547-0.457-0.16-0.177-0.291-0.387-0.391-0.628-0.1-0.242-0.15-0.532-0.15-0.87 0-0.388 0.072-0.729 0.216-1.022 0.144-0.294 0.338-0.538 0.582-0.732s0.532-0.339 0.863-0.435c0.17-0.049 0.346-0.085 0.527-0.109v-1.035h0.985v1.035c0.039 0.005 0.078 0.003 0.117 0.009 0.192 0.029 0.372 0.068 0.539 0.118 0.166 0.050 0.314 0.105 0.443 0.168s0.215 0.113 0.258 0.155c0.039 0.037 0.067 0.072 0.082 0.102zM11.018 19.005c0 3.319 2.242 6.010 5.008 6.010h-11.119c0.056-0.158 0.101-0.323 0.101-0.5 0-0.83-0.673-1.503-1.502-1.503-0.178 0-0.343 0.045-0.501 0.101v-8.215c0.158 0.057 0.323 0.101 0.501 0.101 0.83 0 1.502-0.672 1.502-1.502 0-0.178-0.045-0.343-0.101-0.501h11.119c-2.766-0.001-5.008 2.69-5.008 6.009zM7.011 16.919c-0.83 0-1.502 0.896-1.502 2.003s0.673 2.003 1.502 2.003c0.83 0 1.502-0.896 1.502-2.003s-0.672-2.003-1.502-2.003z"></path> </g></svg>
                    <p className="payment-description">Cash On Delivery</p>
                    </div>
                    <input
                    type="radio"
                    name="payment"
                    value="cash"
                    className="payment-input"
                    onChange={changeHandler}
                    />
                </label>
                <label className={`payment-label ${selected === "credit" ? "label-selected" : ""}`}>
                    <div className="payment-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="65"
                        height="65"
                        fill="currentColor"
                    >
                        <g>
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            d="M22.222 15.768l-.225-1.125h-2.514l-.4 1.117-2.015.004a4199.19 4199.19 0 0 1 2.884-6.918c.164-.391.455-.59.884-.588.328.003.863.003 1.606.001L24 15.765l-1.778.003zm-2.173-2.666h1.62l-.605-2.82-1.015 2.82zM7.06 8.257l2.026.002-3.132 7.51-2.051-.002a950.849 950.849 0 0 1-1.528-5.956c-.1-.396-.298-.673-.679-.804C1.357 8.89.792 8.71 0 8.465V8.26h3.237c.56 0 .887.271.992.827.106.557.372 1.975.8 4.254L7.06 8.257zm4.81.002l-1.602 7.508-1.928-.002L9.94 8.257l1.93.002zm3.91-.139c.577 0 1.304.18 1.722.345l-.338 1.557c-.378-.152-1-.357-1.523-.35-.76.013-1.23.332-1.23.638 0 .498.816.749 1.656 1.293.959.62 1.085 1.177 1.073 1.782-.013 1.256-1.073 2.495-3.309 2.495-1.02-.015-1.388-.101-2.22-.396l.352-1.625c.847.355 1.206.468 1.93.468.663 0 1.232-.268 1.237-.735.004-.332-.2-.497-.944-.907-.744-.411-1.788-.98-1.774-2.122.017-1.462 1.402-2.443 3.369-2.443z"
                        ></path>
                        </g>
                    </svg>
                    <p className="payment-description">Credit Card</p>
                    </div>
                    <input
                        type="radio"
                        name="payment"
                        value="credit"
                        onChange={changeHandler}
                        className="payment-input"
                        />
                </label>
                <label className={`payment-label ${selected === "google" ? "label-selected" : ""}`}>
                    <div className="payment-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="65"
                            height="65"
                            viewBox="0 0 32 32"
                            fill="currentColor"
                        >
                            <path
                                d="M32 13.333l-4.177 9.333h-1.292l1.552-3.266-2.75-6.068h1.359l1.99 4.651h0.026l1.927-4.651zM14.646 16.219v3.781h-1.313v-9.333h3.474c0.828-0.021 1.63 0.266 2.25 0.807 0.615 0.505 0.953 1.219 0.943 1.974 0.010 0.766-0.339 1.5-0.943 1.979-0.604 0.531-1.354 0.792-2.25 0.792zM14.641 11.818v3.255h2.198c0.484 0.016 0.958-0.161 1.297-0.479 0.339-0.302 0.526-0.714 0.526-1.141 0-0.432-0.188-0.844-0.526-1.141-0.349-0.333-0.818-0.51-1.297-0.495zM22.63 13.333c0.833 0 1.495 0.234 1.979 0.698s0.724 1.099 0.724 1.906v3.859h-1.083v-0.87h-0.047c-0.469 0.714-1.089 1.073-1.865 1.073-0.667 0-1.219-0.203-1.667-0.615-0.438-0.385-0.682-0.948-0.672-1.531 0-0.646 0.234-1.161 0.708-1.547 0.469-0.38 1.099-0.573 1.885-0.573 0.672 0 1.224 0.13 1.656 0.385v-0.271c0.005-0.396-0.167-0.776-0.464-1.042-0.297-0.276-0.688-0.432-1.094-0.427-0.63 0-1.13 0.276-1.5 0.828l-0.995-0.646c0.547-0.818 1.359-1.229 2.432-1.229zM21.167 17.88c-0.005 0.302 0.135 0.583 0.375 0.766 0.25 0.203 0.563 0.313 0.88 0.307 0.474 0 0.932-0.198 1.271-0.547 0.359-0.333 0.563-0.802 0.563-1.292-0.354-0.292-0.844-0.438-1.474-0.438-0.464 0-0.844 0.115-1.151 0.344-0.307 0.234-0.464 0.516-0.464 0.859zM5.443 10.667c1.344-0.016 2.646 0.479 3.641 1.391l-1.552 1.521c-0.568-0.526-1.318-0.813-2.089-0.797-1.385 0.005-2.609 0.891-3.057 2.198-0.229 0.661-0.229 1.38 0 2.042 0.448 1.307 1.672 2.193 3.057 2.198 0.734 0 1.365-0.182 1.854-0.505 0.568-0.375 0.964-0.958 1.083-1.625h-2.938v-2.052h5.13c0.063 0.359 0.094 0.719 0.094 1.083 0 1.625-0.594 3-1.62 3.927-0.901 0.813-2.135 1.286-3.604 1.286-2.047 0.010-3.922-1.125-4.865-2.938-0.771-1.505-0.771-3.286 0-4.792 0.943-1.813 2.818-2.948 4.859-2.938z"
                            ></path>
                        </svg>
                        <p className="payment-description">Google Pay</p>
                    </div>
                    <input
                        type="radio"
                        name="payment"
                        onChange={changeHandler}
                        value="google"
                        disabled
                        className="payment-input"
                    />
                </label>
                <label className={`payment-label ${selected === "apple" ? "label-selected" : ""}`}>
                    <div className="payment-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="65"
                            height="65"
                            viewBox="0 0 640 512"
                            fill="currentColor"
                        >
                        <path
                            d="M116.9 158.5c-7.5 8.9-19.5 15.9-31.5 14.9-1.5-12 4.4-24.8 11.3-32.6 7.5-9.1 20.6-15.6 31.3-16.1 1.2 12.4-3.7 24.7-11.1 33.8m10.9 17.2c-17.4-1-32.3 9.9-40.5 9.9-8.4 0-21-9.4-34.8-9.1-17.9.3-34.5 10.4-43.6 26.5-18.8 32.3-4.9 80 13.3 106.3 8.9 13 19.5 27.3 33.5 26.8 13.3-.5 18.5-8.6 34.5-8.6 16.1 0 20.8 8.6 34.8 8.4 14.5-.3 23.6-13 32.5-26 10.1-14.8 14.3-29.1 14.5-29.9-.3-.3-28-10.9-28.3-42.9-.3-26.8 21.9-39.5 22.9-40.3-12.5-18.6-32-20.6-38.8-21.1m100.4-36.2v194.9h30.3v-66.6h41.9c38.3 0 65.1-26.3 65.1-64.3s-26.4-64-64.1-64h-73.2zm30.3 25.5h34.9c26.3 0 41.3 14 41.3 38.6s-15 38.8-41.4 38.8h-34.8V165zm162.2 170.9c19 0 36.6-9.6 44.6-24.9h.6v23.4h28v-97c0-28.1-22.5-46.3-57.1-46.3-32.1 0-55.9 18.4-56.8 43.6h27.3c2.3-12 13.4-19.9 28.6-19.9 18.5 0 28.9 8.6 28.9 24.5v10.8l-37.8 2.3c-35.1 2.1-54.1 16.5-54.1 41.5.1 25.2 19.7 42 47.8 42zm8.2-23.1c-16.1 0-26.4-7.8-26.4-19.6 0-12.3 9.9-19.4 28.8-20.5l33.6-2.1v11c0 18.2-15.5 31.2-36 31.2zm102.5 74.6c29.5 0 43.4-11.3 55.5-45.4L640 193h-30.8l-35.6 115.1h-.6L537.4 193h-31.6L557 334.9l-2.8 8.6c-4.6 14.6-12.1 20.3-25.5 20.3-2.4 0-7-.3-8.9-.5v23.4c1.8.4 9.3.7 11.6.7z"
                        ></path>
                        </svg>
                        <p className="payment-description">Apple Pay</p>
                    </div>
                    <input
                    type="radio"
                    name="payment"
                    value="apple"
                    disabled
                    onChange={changeHandler}
                    className="payment-input"
                    />
                </label>
                <div className="payment-button-container">
                    {/* Transaction Button */}
                    <div class="container" onClick={ForwardButtonClick}>
                        <div class="left-side">
                            <div class="card">
                                <div class="card-line"></div>
                                <div class="buttons"></div>
                            </div>
                            <div class="post">
                                <div class="post-line"></div>
                                <div class="screen">
                                    <div class="dollar">₹</div>
                                </div>
                                <div class="numbers"></div>
                                <div class="numbers-line2"></div>
                            </div>
                        </div>
                        <div class="right-side">
                            <div class="new">New Transaction</div>
                            <svg viewBox="0 0 451.846 451.847" height="512" width="512" xmlns="http://www.w3.org/2000/svg" class="arrow"><path fill="#cfcfcf" data-old_color="#000000" class="active-path" data-original="#000000" d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z"></path></svg>
                        </div>
                </div>
                {/* Go Back Button */}
                <button type="button" class="payment-back-button" onClick={BackButtonClick}>
                    <div class="payment-inner-button">
                        <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            fill="#000000"
                            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                        ></path>
                        <path
                            fill="#000000"
                            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                        ></path>
                        </svg>
                    </div>
                    <p class="payment-button-text">Go Back</p>
                </button>
            </div>
        </div>
    </div>
    )
}

export default PaymentGateway;