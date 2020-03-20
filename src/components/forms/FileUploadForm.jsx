import React from "react";
import { Form,Button } from "semantic-ui-react"


export default class FileUploadForm extends React.Component {
	render(){
		return(
			<Form onSubmit={this.props.onSubmit}>
						<Form.Field>
							<label>File:</label>
							<input type="file" id="file" style={{ display: "hidden" }} name="user[image]" 
						        multiple
						        onChange={this.props.onChange}/>
						</Form.Field>
						
						<Form.Field>
							<Button className="ui primary">Upload</Button>
						</Form.Field>
					</Form>
		)
	}
}





