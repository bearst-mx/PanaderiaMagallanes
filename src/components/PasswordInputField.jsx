function PasswordInputField({handleValidation, handlePasswordChange, passwordValue, passwordError}){
    return (
        <>
    <div className="form-group my-3">
        <label htmlFor="UsPassInp" style={{
            textAlign:"left",
            display:"block",
            // marginTop:"20px"
        }}>
            <p style={{
                fontWeight:"bold",
                marginBottom:"5px"
            }}>Contraseña</p>
            <input value={passwordValue} type="password" id="UsPassInp" onChange={handlePasswordChange} onKeyUp={handleValidation} name="password" required style={{
                border:"2px solid black",
                borderRadius:"0.3rem",
                outline:"none",
                width:"100%",
                padding:"5px"
            }}/>
        </label>
        {/* <input type="password" value={passwordValue}  onChange={handlePasswordChange} onKeyUp={handleValidation} name="password" placeholder="Password" className="form-control" required/> */}
        <p className="text-danger">{passwordError}</p>
   </div>
          
        </>
    )
}

export default PasswordInputField;