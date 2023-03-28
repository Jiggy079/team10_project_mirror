import React from "react";
import ImageList from '@mui/material/ImageList';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import bus from '../../utils/bus';
import { StyledEngineProvider } from '@mui/material/styles';
import {Card} from "@mui/material";

class ImageExplorer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			annotationList: null,
			annotationsLoaded: false,
			imageList: null,
			imagesLoaded: false,
			showedImage: null,
			selectedYears:[],
			picturePerline: 4,
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
		fetch("https://files.catbox.moe/9j21gm.json")
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
				if (this.props.filters !== null) {
					// iterate over each filter
					let fitsFilters = true;
					for (const filter in this.props.filters) {
						// if current filter is not set to "none" i.e. there is one applied
						if (this.props.filters[filter] !== "none") {
							// if the annotation value for current filter does not match filter value, set fitsFilters false
							if (this.state.annotationList[i][filter] !== this.props.filters[filter]) {
								fitsFilters = false;
							}
						}
					}
					// only push to annotated ids if all filters were matched
					if (fitsFilters) {
						annotatedIDs.push(this.state.annotationList[i]["imageId"]);
					}
				// if filters is still null then just push all annotations normally
				} else {
					annotatedIDs.push(this.state.annotationList[i]["imageId"]);
				}
			}
		}

		// for all images, push to result if its id is present in annotatedIDs and it matches year filter
		for (let i = 0; i < this.state.imageList.length; i++) {
			if (annotatedIDs.includes(this.state.imageList[i]["imageID"])) {
				if (this.state.selectedYears.length > 0) {
					if (this.state.imageList[i]["year"] >= this.state.selectedYears[0] && this.state.imageList[i]["year"] <= this.state.selectedYears[1]) {
						result.push(this.state.imageList[i]);
					}
				} else {
					result.push(this.state.imageList[i]);
				}
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
						if (temp[index]["year"]===i) {
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
		bus.on('picPerline',
				data =>{
					this.setState({picturePerline:data})
				}
			)
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		// tell component to forcefully update to apply filters if they change
		if (prevProps.filters !== this.props.filters) {
			this.setState({annotationsLoaded: false, imagesLoaded: false});
		}
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

			return (
				<StyledEngineProvider injectFirst>
					<div id="imageExplorerContainer">
						{/*<ImageList sx={{ width: 1850 }} cols={4}>*/}
						<ImageList cols={this.state.picturePerline} gap={5}>
							{annotatedImages.map((item) => (
								<Card>
									<ImageListItem key={item["url"]}>
										<img
											src={item["url"]}
											alt="Figure"
											loading="lazy"/>
										<ImageListItemBar
											title={item["name"]}
											position={"below"}
										/>
									</ImageListItem>
								</Card>
							))}
						</ImageList>
					</div>
				</StyledEngineProvider>
			);
		}
	}
}

export default ImageExplorer;
