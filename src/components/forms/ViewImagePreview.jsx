import React from "react";
import { Button,Image,Card,Grid } from "semantic-ui-react"


export default class ViewImagePreview extends React.Component {
	
	bytesToSize = (bytes) =>  {
		   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		   if (bytes === 0) return '0 Byte';
		   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
		}

	render(){
		return(
	<Grid columns={3} divided>
					    <Grid.Row>
					    {this.props.imgs && [...this.props.imgs].map((file,key)=>(
					      <Grid.Column key={key}>
					    	<Card>
						       	<Image size="medium" className="ui img" src={URL.createObjectURL(file)} />
						       	<Card.Content>
						       		<label>File Name: {file.name}</label><br />
						       		<label>File Size: {this.bytesToSize(file.size)}</label><br />
						       		<Button color="orange" key={key}   id={file.lastModified} onClick={()=>this.props.removeElement(file.lastModified)}>Remove</Button>
						       	</Card.Content>
					       </Card>
					       </Grid.Column>
					    ))}
					    </Grid.Row>
				    </Grid>
		)
	}
}

