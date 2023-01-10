function ConfirmPasswordInputField({handleValidation, handlePasswordChange, confirmPasswordValue, confirmPasswordError}){
    return (
        <>
     <div className="form-group my-3">
        <label htmlFor="UsConfirmPassInp" style={{
            textAlign:"left",
            display:"block",
            // marginTop:"20px"
        }}>
            <p style={{
                fontWeight:"bold",
                marginBottom:"5px"
            }}>Confirmar contraseña</p>
            <input type="text" id="UsConfirmPassInp" value={confirmPasswordValue}  onChange={handlePasswordChange} onKeyUp={handleValidation} name="confirmPassword" className="form-control" required style={{
                border:"2px solid black",
                borderRadius:"0.3rem",
                outline:"none",
                width:"100%",
                padding:"5px"
            }}/>
        </label>
        {/* <input type="password" value={confirmPasswordValue}  onChange={handlePasswordChange} onKeyUp={handleValidation} name="confirmPassword" placeholder="Confirm Password" className="form-control" required/> */}
        <p className="text-danger">{confirmPasswordError}</p>
    </div>
        </>
    )
}

export default ConfirmPasswordInputField;