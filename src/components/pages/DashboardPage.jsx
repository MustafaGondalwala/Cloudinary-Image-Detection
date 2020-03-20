import React,{Component} from "react";
import {Segment,Header,Grid,Card,Image,Form,Container} from 'semantic-ui-react'
import axios from 'axios'
import { connect } from 'react-redux'
import { fileCreated } from "../../actions/auth"
import ViewDashboardImagePreview from "../forms/ViewDashboardImagePreview"
class DashboardPage extends Component {
	state = {
		files: [],
		searchInput:"",
		loading:true,
		noSearchFound:false,
		loadMoreLoading:false,
		page:10
	};

	componentDidMount(){
		if(Object.keys(this.props.files).length === 0){
			axios({
				method:'post',
				url:'https://django-ml-backend.herokuapp.com/api/cloudinary/file',
				data:{
					userId:this.props.id
				}
			}).then((res)=>{
				this.setState({files:res.data.files})
				this.props.fileCreated(res.data.files)
				this.setState({
					loading:false
				})
			})
		}else{
			this.setState({
				files: this.props.files,
				loading:false
			})
		}
		
	}

	removeElement = (id) => {
		this.setState({
			loading:true
		})
		axios({
			method:'post',
			url:'https://django-ml-backend.herokuapp.com/api/cloudinary/file/deleteImage',
			data: {
				fileId:id
			}
		}).then(res => {
			this.setState({files:res.data.files})
			this.props.fileCreated(res.data.files)
			this.setState({
				loading:false
			})
		})
	}

	onChange = (e) => {
		const value = e.target.value
		this.setState({
			searchInput:value
		})
		if(value.length<3)
			this.setState({files:this.props.files,noSearchFound:false})
		this.setState({
			loading:true
		})
		axios({
			url:'https://django-ml-backend.herokuapp.com/api/cloudinary/file/search',
			data: {
				searchValue:value
			},
			method:'post'
		}).then((data)=>{
			if(data.data.files.length==0){
				this.setState({
					noSearchFound:true,
					loading:false
				})
			}else{
				this.setState({
					files:data.data.files,
					noSearchFound:false,
					loading:false
				})
			}
		})
	}
	loadMore = (e) => {
		this.setState({
			loadMoreLoading:true
		})
		const page = this.state.page + 10
		this.setState({
			page:page
		})
		axios({
			url:'https://django-ml-backend.herokuapp.com/api/file/getMore',
			method:'post',
			data:{
				page: page
			}
		}).then((res)=>{
			this.setState({
				files:res.data.files,
				loadMoreLoading:false
			})
		})
	}
	render(){
		const {searchInput,noSearchFound,loading,loadMoreLoading} = this.state
		return(
			<Container>
				<br />
				{Object.keys(this.state.files).length>0 &&
					(
						<Segment>
							<label><h5>Search</h5></label><br />
							<Form.Input value={searchInput} onChange={this.onChange} fluid size='large' placeholder="Name"/>
						</Segment>
					)
				}
				{noSearchFound &&
					<Segment>
						<Header>No Search Data Found</Header>
					</Segment>
				}
				<Segment  loading={loading}>
					<Header>
						Dashboard
					</Header>

						    {this.state.files && (
						    	<div>
						      	<ViewDashboardImagePreview removeElement={this.removeElement} imgs={this.state.files}/>    	
								<Form.Button onClick={this.loadMore}  loading={loadMoreLoading} primary fluid>Load More</Form.Button>
								</div>
						    	)
							}

				</Segment>
			</Container>
		)
	}
}

function mapStateToProps(state) {
  return {
    files: state.files,
    id:state.user.id
  };
}
export default connect(mapStateToProps,{ fileCreated })(DashboardPage)