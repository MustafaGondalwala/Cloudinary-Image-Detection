import React from "react";
import { Button,Image,Card,Grid,Modal} from "semantic-ui-react"
import SweetAlert from 'react-bootstrap-sweetalert'


export default class ViewImagePreview extends React.Component {
	state = {
		removeElementId:'',
		showRemoveBox:'',
		open:false,
		path:''
	}
	bytesToSize = (bytes) =>  {
		   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		   if (bytes === 0) return '0 Byte';
		   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
		}

	showRemoveBox = (file_id) => {
		this.setState({
			removeElementId:file_id,
			showRemoveBox:true
		})
	}
	onCancel = () => {
		this.setState({
			removeElementId:"",
			showRemoveBox:false
		})
	}
	remove = () => {
		this.setState({
			showRemoveBox:false
		})
		this.props.removeElement(this.state.removeElementId)
	}

	showFullImage = (path) => {
		this.setState({
			path:path,
			open:true
		})
	}
	closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  close = () => this.setState({ open: false })
	render(){

    const { open, closeOnEscape, closeOnDimmerClick,path } = this.state
		return(<div>




					{this.state.showRemoveBox &&
					<SweetAlert
					  warning
					  showCancel
					  confirmBtnText="Yes, delete it!"
					  confirmBtnBsStyle="danger"
					  title="Are you sure?"
					  onConfirm={this.remove}
					  onCancel={this.onCancel}
					  focusCancelBtn
					>
					  You will not be able to recover this Image!
					</SweetAlert>
					}


			 		<Modal
			  		  dimmer='blurring'
			          open={open}
			          closeOnEscape={closeOnEscape}
			          closeOnDimmerClick={closeOnDimmerClick}
			          onClose={this.close}
			        >
			          <Modal.Header>Image</Modal.Header>
			          <Modal.Content>
			          	<Image size="huge" src={path}/>
			          </Modal.Content>
			          <Modal.Actions>
			            <Button
			              onClick={this.close}
			              positive
			              labelPosition='right'
			              icon='checkmark'
			              content='Close'
			            />
			          </Modal.Actions>
			        </Modal>
					<Grid columns={3} divided>
					    <Grid.Row>

						    {this.props.imgs && [...this.props.imgs].map((file,key)=>(
						      <Grid.Column key={key}>
						    	<Card  style={{margin:'15px'}}>
							       	<Image onClick={()=>this.showFullImage(file.path)} size="medium" className="ui img" src={file.path} />
							       	<Card.Content>
							       		<label>File Name: {file.name}</label><br />
							       		<label>File Size: {this.bytesToSize(file.size)}</label><br />
							       		<label style={{textoverflow:true}}>Objects Found: {file.imageRecog}</label><br />
							       		<br /><br />
							       		<Button color="orange" onClick={()=>this.showRemoveBox(file._id)}>Remove</Button>
							       	</Card.Content>
						       </Card>
						       </Grid.Column>

						    ))}

					    </Grid.Row>
				    </Grid>
				    </div>
		)
	}
}

