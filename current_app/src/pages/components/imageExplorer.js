import React from "react";
import ImageList from '@mui/material/ImageList';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

class ImageExplorer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			annotationList: null,
			annotationsLoaded: false,
			imageList: null,
			imagesLoaded: false
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
		fetch("https://files.catbox.moe/7dvpgw.json")
			.then(res => res.json())
			.then((res) => {
				this.setState({imageList: res, imagesLoaded: true})
			});
	}

	getAnnotatedImages() {
		let result = [];

		// for each image, if there is any element in annotationList with the same id (i.e. if the image has any
		// annotations), then append it to `result`
		for (let i = 0; i < this.state.imageList.length; i++) {
			for (let j = 0; j < this.state.annotationList.length; j++) {
				if (this.state.imageList[i]["imageId"] === this.state.annotationList[j]["id"].toString()) {
					result.push(this.state.imageList[i]);
					break;
				}
			}
		}
		return result;
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
			let annotatedImages = this.getAnnotatedImages();
			console.log(annotatedImages);

			return (
				<div id="imageExplorerContainer">
					<ImageList sx={{ width: "100%", height: "100%"}}>
						{annotatedImages.map((item) => (
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