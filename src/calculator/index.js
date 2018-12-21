import React, { Component } from "react";
import { Form, Button, Grid } from "semantic-ui-react";

export default class Calculator extends Component {
    constructor(){
        super()
        this.state = {
                openP: "[",
                closeP: "]",
                E: ["**2","**3"],
                MD: ["*","/","%"],
                AS: ["-","+"],
                equation:"",
                currentNumber: "",
                numbers: [],
                nonNumbers: []
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleTypeInput = this.handleTypeInput.bind(this);
        this.solve = this.solve.bind(this);
        this.NewNumber = this.NewNumber.bind(this);
    }

    handleInput = (e) =>{
        if(isNaN(e.currentTarget.value) && 
        (this.state.openP === e.currentTarget.value ||
         this.state.closeP === e.currentTarget.value || 
        this.state.MD.includes(e.currentTarget.value) ||
        this.state.AS.includes(e.currentTarget.value))){
            
            this.setState({
                equation: this.state.equation + e.currentTarget.value,
                numbers: [... this.state.numbers, this.state.currentNumber],
                nonNumbers: [...this.state.nonNumbers, e.currentTarget.value]
            })
            this.NewNumber()
        } 
        else if(isNaN(e.currentTarget.value) && 
        (this.state.P.includes(e.currentTarget.value) === false || 
        this.state.MD.includes(e.currentTarget.value) === false ||
        this.state.AS.includes(e.currentTarget.value) === false)){
            return true;
        }
        else{
            this.setState({
                equation: this.state.equation + e.currentTarget.value,
                currentNumber: e.currentTarget.value
            })
        }
    }

    handleTypeInput = (e) =>{
        this.setState({
            equation: e.currentTarget.value
        })
    }

    NewNumber = async() => {
        try{
           await this.setState({
             numbers: [...this.state.numbers, parseInt(this.state.currentNumber)],
             currentNumber: ""
           })
        }
        catch(err){
        console.log(err)
    }
    }

    solve = async() => {
        try{
        await this.setState({
            numbers: [...this.state.numbers, parseInt(this.state.currentNumber)],
            currentNumber: ""
        })

        let MDIndex = [];
        let ASIndex = [];
        this.state.nonNumbers.forEach(async(element, i)=>{
            try{
                if(element === "*" || element === "/" || element === "%" ){
                    MDIndex.push(i)
                }
                else if(element === "+" || element === "-"){
                    ASIndex.push(i)
                }  
                else{

                }
            }
            catch(err){
                console.log("error nonNumbers")
            }
        })
       // console.log("MDIndex", MDIndex)
       // console.log("ASIndex", ASIndex)

       await MDIndex.forEach(async(element, i)=>{
          try{
              if("*" === this.state.nonNumbers[element]){
                  let value = this.state.numbers[element] * this.state.numbers[element + 1]
                 
                  //console.log(typeof this.state.numbers[i],typeof this.state.numbers[i+1])
                  const results = await this.state.numbers.filter( number => 
                      number !== this.state.numbers[element] 
                )
                  
                  console.log(results)
                  
                  if(this.state.numbers.length > 0){
                    await this.setState({
                        numbers: results.splice(element + 1, 0, value)
                    })
                  }
                  else{
                    await this.setState({
                        numbers: results.push(value)
                    })
                  }
                  //console.log(value)
                  console.log(this.state.numbers)
              }

              else if("/" === this.state.nonNumbers[element]){
                  let value = this.state.numbers[i] / this.state.numbers[i + 1]
                  this.setState({
                      numbers: this.state.numbers.filter( number => 
                          number !== this.state.numbers[i] || number !== this.state.numbers[i + 1]
                      )
                  })
                  console.log(this.state.numbers)
                  this.setState({
                      numbers: this.state.numbers.splice(i, 0, value)
                  })
              }

              else if("%" === this.state.nonNumbers[element]){
                  let value = this.state.numbers[i] % this.state.numbers[i + 1]
                  this.setState({
                      numbers: this.state.numbers.filter( number => 
                          number !== this.state.numbers[i] || number !== this.state.numbers[i + 1]
                      )
                  })
                  console.log(this.state.numbers)
                  this.setState({
                      numbers: this.state.numbers.splice(i, 0, value)
                  })
              }
              else{
                  return true;
              }
            }
            catch(err){
                console.log("error MD")
            }
        })

       await ASIndex.forEach(async(element, i)=>{
            try{
                if("+" === this.state.nonNumbers[element]){
                    let value = this.state.numbers[i] + this.state.numbers[i + 1]
                    await this.setState({
                        numbers: this.state.numbers.filter( number => 
                            number !== this.state.numbers[i] || number !== this.state.numbers[i + 1]
                        )
                    })
                    await this.setState({
                        numbers: this.state.numbers.splice(i, 0, value)
                    })
                }

                else if("-" === this.state.nonNumbers[element]){
                    let value = this.state.numbers[i] - this.state.numbers[i + 1]
                    await this.setState({
                        numbers: this.state.numbers.filter( number => 
                            number !== this.state.numbers[i] || number !== this.state.numbers[i + 1]
                        )
                    })
                    await this.setState({
                        numbers: this.state.numbers.splice(i, 0, value)
                    })
                }
                else{
                    return true;
                }

            }
            catch(err){
                console.log("err AS")
            }
        })
       // console.log(this.state.numbers)
        }
        catch(err){
            console.log("err on Solve")
        }

    }

    render() {
        return(
            <div>
                <b>numbers: {this.state.numbers}</b>
                <b> current number: {this.state.currentNumber}</b>
                <Form>
                  <Form.Input onChange={this.handleTypeInput} value={this.state.equation} type="text"/>
                    <Grid columns={4}>
                      <Grid.Row>
                          <Button value="=" onClick={this.solve}>=</Button>
                      </Grid.Row>
                      <Grid.Row>
                      <Button value="9" onClick={this.handleInput}>9</Button>
                      <Button value="8" onClick={this.handleInput}>8</Button>
                      <Button value="7" onClick={this.handleInput}>7</Button>
                      <Button value="%" onClick={this.handleInput}>%</Button>
                      </Grid.Row>
                      <Grid.Row>
                      <Button value="6" onClick={this.handleInput}>6</Button>
                      <Button value="5" onClick={this.handleInput}>5</Button>
                      <Button value="4" onClick={this.handleInput}>4</Button>
                      <Button value="/" onClick={this.handleInput}>/</Button>
 
                      </Grid.Row>
                      <Grid.Row>
                      <Button value="3" onClick={this.handleInput}>3</Button>
                      <Button value="2" onClick={this.handleInput}>2</Button>
                      <Button value="1" onClick={this.handleInput}>1</Button>
                      <Button value="*" onClick={this.handleInput}>*</Button>
                      </Grid.Row>
                      <Grid.Row>
                      <Button value="." onClick={this.handleInput}>.</Button>
                      <Button value="0" onClick={this.handleInput}>0</Button>
                      <Button value="+" onClick={this.handleInput}>+</Button>
                      <Button value="-" onClick={this.handleInput}>-</Button>
                      
                      </Grid.Row>
                       </Grid>
                </Form>
            </div>
        )
    }
}