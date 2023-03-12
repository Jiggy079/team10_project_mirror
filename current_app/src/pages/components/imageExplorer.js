import React from "react";
import ImageList from '@mui/material/ImageList';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import bus from '../../utils/bus';

class ImageExplorer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			annotationList: null,
			annotationsLoaded: false,
			imageList: null,
			imagesLoaded: false,
			showedImage: null,
			selectedYears:[]
		};
		this.getAnnotations = this.getAnnotations.bind(this);
		this.getImages = this.getImages.bind(this);
		this.getAnnotatedImages = this.getAnnotatedImages.bind(this);
	}

	getAnnotations() {
		fetch("https://express-backend-vfm5.onrender.com/annotation")
			.then(res => res.json())
			.then((res) => this.setState({annotationList: res, annotationsLoaded: true}))
	}

	getImages() {
		fetch("https://files.catbox.moe/aumoxt.json")
			.then(res => res.json())
			.then((res) => {
				this.setState({imageList: res["in"], imagesLoaded: true, showedImage: res["in"]})
			});
	}

	getAnnotatedImages() {
		let result = [];
		let annotatedIDs = [];

		// for all annotations, push its id value to annotatedIDs if not already present
		for (let i = 0; i < this.state.annotationList.length; i++) {
			if (!annotatedIDs.includes(this.state.annotationList[i]["imageId"])) {
				annotatedIDs.push(this.state.annotationList[i]["imageId"]);
			}
		}

		// for all images, push to result if its id is present in annotatedIDs
		for (let i = 0; i < this.state.imageList.length; i++) {
			if (annotatedIDs.includes(this.state.imageList[i]["imageID"])) {
				result.push(this.state.imageList[i]);
			}
		}

		return result;
	}

	componentDidMount() {
		bus.on('yearRange',
			data =>{
				this.setState({selectedYears:data})

				let temp = this.getAnnotatedImages()
				let filtered = []

				for (let index in temp) {
					for (let i = data[0]; i <= data[1]; i++) {
						if (temp[index]["name"].includes(i)) {
							if(!filtered.includes(this.state.imageList[index]))
								filtered.push(this.state.imageList[index])
						}
					}
				}
				this.setState(
					() => {
						return {showedImage: filtered}
					}
				)
			})
	}

	render() {
		if (!this.state.annotationsLoaded) {
			this.getAnnotations();
		}
		if (!this.state.imagesLoaded) {
			this.getImages();
		}

		if (this.state.imagesLoaded === false || this.state.annotationsLoaded === false) {
			return (
				<div id="imageExplorerContainer">
					<Box sx={{width: "100%", height: "100%"}}>
						<CircularProgress />
					</Box>
				</div>
			);
		} else {
			// let annotatedImages = this.getAnnotatedImages();

			return (
				<div id="imageExplorerContainer">
					<ImageList sx={{ width: "100%", height: "100%"}}>
						{this.state.showedImage.map((item) => (
							<ImageListItem key={item["url"]}>
								<img
									src={item["url"]}
									alt="Image"
									loading="lazy"/>
								<ImageListItemBar
									title={item["name"]}
									position={"below"}
								/>
							</ImageListItem>
						))}
					</ImageList>
				</div>
			);
		}
	}
}

export default ImageExplorer;
