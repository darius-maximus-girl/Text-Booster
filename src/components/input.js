import React, { Component } from 'react';

export class InputField extends Component {
    constructor (props) {
        super(props);
        this.state = {    
        value: '',
        synonyms: [],
    };

        this.handleChange = this.handleChange.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.renderResponse = this.renderResponse.bind(this);
    }

    handleChange(e) {
        this.setState({
           value: e.target.value,
           synonyms: this.state.synonyms,
        })
    }

    renderResponse(res) {
        if (this.state.value === '') {
            return
        }
        
        if (!res) {
            console.log(res.status);
        }

        if (!res.length) {
            return (
                this.setState({
                value: this.state.value,
                synonyms: ['Try again! There were no suggestions found!'],
                    }
                )  
            )
        }

        let newArr = [];

        for (let i = 0; i < Math.min(res.length, 10); i++) {
            newArr.push(res[i].word);
        };

        return this.setState({
            value: this.state.value,
            synonyms: newArr
        });
    }
    

     getSuggestions(e) {
        const url = 'https://api.datamuse.com/words';
        const queryParams = '?rel_' + e.target.value + "=";
        const wordQuery = this.state.value;
        const endpoint = `${url}${queryParams}${wordQuery}`;

         fetch(endpoint).then( response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed! Try again.');   
        }).then( jsonResponse => {
           let response = this.renderResponse(jsonResponse);
           console.log(response)
        })
    }
    
    render() {
        return (
               <div className="App">
                <header className="App-header">
                <div id="heading">
                    <img src="https://img.icons8.com/wired/64/000000/t.png" alt="letter T"></img>
                    <img src="https://img.icons8.com/dotty/80/000000/delete-sign.png" alt="X sign"></img>
                    <img src="https://img.icons8.com/wired/64/000000/t.png" alt="letter T"></img>
                    <p>booster</p>
                </div>
                </header>
               <nav className="inputPart">
                    <input onChange={this.handleChange} placeholder="Your word goes here..." className="input"></input>
                    <button onClick={this.getSuggestions} value="syn" className="animated pulse">
                        Find a synonym
                    </button>
                    <button onClick={this.getSuggestions} value="rhy" className="animated pulse">Find rhyming words</button>
                    <button onClick={this.getSuggestions} value="jjb" className="animated pulse">Find describing adjectives</button>
                    <button onClick={this.getSuggestions} value="ant" className="animated pulse">Find an antonym</button>
               </nav>
               <section className="resultPart">
               Results:
                   <ul className="result">
                       {
                           this.state.synonyms.map((synonym, id) => (
                           <li key={id}>{synonym}</li>
                       ))
                     }
                   </ul>
               </section>
               <footer className="footer">
                    <a href="https://icons8.com/">
                        Icons By Icons8
                    </a>
                </footer>
               </div>
        )
    }
}   

