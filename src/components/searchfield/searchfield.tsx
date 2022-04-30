import {TextField} from "@mui/material"
import React from "react"
import "./searchfield.css"

export default class SearchField extends React.Component<{}, { value: string }>{
    constructor(props: Object){
        super(props)
        this.state = {value: ""};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any){
        this.setState({value: event.target.value});
    }

    render(){
        return (
            <div className='search-field'>
                <TextField
                    id="search-text"
                    label="Search"
                    variant="outlined"
                    color="primary"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </div>
        )
    }

}

