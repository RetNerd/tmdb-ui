import {TextField} from "@mui/material"
import React from "react"
import "./searchfield.css"

/**
 * A wrapper for a {@link https://mui.com/material-ui/react-text-field/ material ui textfield} to be used as a search field
 */

export default class SearchField extends React.Component<{}, { value: string }>{
    constructor(props: Object){
        super(props)
        this.state = {value: ""};
        this.handleChange = this.handleChange.bind(this);
        this.getValue = this.getValue.bind(this);
    }

    handleChange(event: any){
        this.setState({value: event.target.value});
    }

    getValue(){
        return this.state.value;
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

