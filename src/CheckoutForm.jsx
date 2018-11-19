import React, {Component} from 'react';
import {CardCVCElement, CardElement, CardExpiryElement, CardNumberElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {complete: false};
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        let {token} = await this.props.stripe.createToken({name: "Name"});        // this call creates token

        console.log("Token: ", token);
        let response = await fetch("/charge", {
            method: "POST",
            headers: {"Content-Type": "plain/text"},
            body: token.id
        });
        console.log("Response: ", response);


        if (response.ok) this.setState({complete: true});
    }

    render() {
        if (this.state.complete) return <h1>Purchase Complete</h1>;


        return (
            <div className="checkout">
                <p>Would you like to complete the purchase?</p>
                {/*<CardElement />*/}
                <CardNumberElement/>
                <CardExpiryElement/>
                <CardCVCElement/>
                <button onClick={this.submit}>Send</button>
            </div>
        );
    }

}

export default injectStripe(CheckoutForm);
//
// import React, {Component} from 'react';
// import {CardCVCElement, CardElement, CardExpiryElement, CardNumberElement, injectStripe} from 'react-stripe-elements';
//
// class CheckoutForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {complete: false};
//         this.submit = this.submit.bind(this);
//     }
//
//     async submit(ev) {
//         let {token} = await this.props.stripe.createToken({name: "Name"});
//
//         console.log("Token: ", token);
//         let response = await fetch("/charge", {
//             method: "POST",
//             headers: {"Content-Type": "plain/text"},
//             body: token.id
//         });
//
//         if (response.ok) this.setState({complete: true});
//     }
//
//     render() {
//         if (this.state.complete) return <h1>Purchase Complete</h1>;
//
//
//         return (
//             <div className="checkout">
//                 <p>Would you like to complete the purchase?</p>
//                 {/*<CardElement />*/}
//                 <CardNumberElement/>
//                 <CardExpiryElement/>
//                 <CardCVCElement/>
//                 <button onClick={this.submit}>Send</button>
//             </div>
//         );
//     }
//
// }
//
// export default injectStripe(CheckoutForm);