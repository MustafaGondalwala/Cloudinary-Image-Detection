import React,{Component} from "react";
import { Segment,Message } from "semantic-ui-react"
import ReactS3 from 'react-s3';
import axios from 'axios';
import { connect } from "react-redux";
import FileUploadForm from '../forms/FileUploadForm'
import ViewImagePreview from '../forms/ViewImagePreview'
import { fileCreated } from "../../actions/auth";

class FileUploadPage extends Component {
		state = {
			imgs : [],
			divClass:'dropzone',
			loading:false,
			totalFileUploaded:0
		}
		
		onChange =  (event) => {
			const files = this.state.imgs;
			[...event.target.files].map((file)=>{
				files.push(file)
				return file
			})
	    	this.setState({
	        	imgs: files,
	        	totalFileUploaded:0
	    	})
	    	event.target.value = null;
		};
	
	
		removeElement = (file_id) => {
			const allFiles = [];
			[...this.state.imgs].map((file)=>{
				if(file.lastModified !== file_id)
					allFiles.push(file)
				return null;
			})
			this.setState({imgs:allFiles})
		}
		
	   onSubmit = (e) => {
			const config = {
		    	bucketName: 'cloudinaryimagebucket',
		    	region: 'us-east-2',
		    	dirName: this.props.email,
		    	accessKeyId: 'AKIA4ARUE4R7P2A4KXWK',
		    	secretAccessKey: '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',
			};
			this.setState({loading:true});
			[...this.state.imgs].map((file,i)=>{
				let main = {'size':file.size,'lastModified':file.lastModified,'name':file.name,'type':file.type}
				ReactS3.uploadFile(file,config).then((data)=>{
					axios({
						method:'post',
						data:{
							fileDetails:main,
							S3File:{'directoryFile':data.key,'path':data.location},
							userId:this.props.id
						},
						url:"http://ec2-3-6-67-212.ap-south-1.compute.amazonaws.com:8000/api/cloudinary/file/sendImageDetails"
					}).then((res)=>{
						this.setState({imgs:[]})
						var totalFileUploaded = this.state.totalFileUploaded + 1
						this.setState({loading:false,totalFileUploaded:totalFileUploaded});
						console.log(res.data.files)
						 this.props.fileCreated(res.data.files)
					})
				})
				return file
	    	})
	}
	render(){
		
		return (
			<div className="ui container">
				<br />

				<Segment loading={this.state.loading}>

					{this.state.totalFileUploaded>0 && (
						<Message positive>Total Files Uploaded: {this.state.totalFileUploaded}</Message>

						)}
				    <ViewImagePreview removeElement={this.removeElement} imgs={this.state.imgs}/>
				    <br />
					<FileUploadForm onSubmit={this.onSubmit} onChange={this.onChange}  />
				</Segment>
	    	</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
    id:state.user.id,
  };
}
export default connect(mapStateToProps,{ fileCreated })(FileUploadPage)