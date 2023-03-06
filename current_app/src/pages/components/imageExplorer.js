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
			return (
				<div id="imageExplorerContainer">
					<ImageList sx={{ width: "100%", height: "100%"}}>
						{this.state.annotationList.map((item) => (
							<ImageListItem key={this.state.imageList["in"][item.id]["url"]}>
								<img
									src={this.state.imageList["in"][item.id]["url"]}
									alt="Image"
									loading="lazy"/>
								<ImageListItemBar
									title={this.state.imageList["in"][item.id]["name"]}
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