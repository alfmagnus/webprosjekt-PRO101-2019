div className="loginform">
        <form>
            <h2 className="LoginText">Login</h2>
            <div class="login-group">
                <label for="exampleInputEmail1">Email address</label>
                <br/>
                <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="LoginInput" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div class="login-group">
                <label for="exampleInputPassword1">Password</label>
                <br/>
                <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="LoginInput" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" onClick={this.signup} class="loginbtn" id="loginbtn">Signup</button>
        </form>
      </div>