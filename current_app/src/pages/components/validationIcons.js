import React, { useEffect, useState } from "react";
import { Button, IconButton, Stack, TextField, Tooltip, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ContrastIcon from '@mui/icons-material/Contrast';
import GradientIcon from '@mui/icons-material/Gradient';
import FilterBAndWTwoToneIcon from '@mui/icons-material/FilterBAndWTwoTone';
import BarChartIcon from '@mui/icons-material/BarChart';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import NotInterestedRoundedIcon from '@mui/icons-material/NotInterestedRounded';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import SignalCellular0BarIcon from '@mui/icons-material/SignalCellular0Bar';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import SentimentNeutralRoundedIcon from '@mui/icons-material/SentimentNeutralRounded';
import SentimentDissatisfiedRoundedIcon from '@mui/icons-material/SentimentDissatisfiedRounded';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';

export default function ValidationIcons({annotations, id}) {
    
    // will ensure the annotations are phrased as currentUser, the other user later
    // or considering to change it to getting two annotations separately and change the related ways to get annotations

    // init the current user's 
    const [bw, setBw] = useState(false);
    const [grey, setGrey] = useState(false);
    const [colour, setColour] = useState(false);
    const [aesthetics, setAesthetics] = useState(false);
    const [mapping, setMapping] = useState(false);
    const [depth, setDepth] = useState(false);
    const [uncertainUse, setUncertainUse] = useState(false);
    const [naUse, setNaUse] = useState(false);

    // set the other user's annotation as fixed value
    const bw0 = annotations[1]["colour"]==="black and white";
    const grey0 = annotations[1]["colour"]==="grey";
    const colour0 = annotations[1]["colour"]==="colour";
    // const aesthetics0 = annotations[0]["use"]==="aesthetics";
    // const mapping0 = annotations[0]["use"]==="colour-mapping";
    // const depth0 = annotations[0]["use"]==="depth-perception";
    // const uncertainUse0 = annotations[0]["use"]==="uncertain";
    // const naUse0 = annotations[0]["use"]==="NA";

    // set the current user's annotations
    useEffect(() => {
        setBw(annotations[0]["colour"]==="black and white");
        setGrey(annotations[0]["colour"] === "grey");
        setColour(annotations[0]["colour"] === "colour");
        // setAesthetics(annotations[0]["use"] === "aesthetics");
        // setMapping(annotations[0]["use"] === "colour-mapping");
        // setDepth(annotations[0]["use"] === "depth-perception");
        // setUncertainUse(annotations[0]["use"] === "uncertain");
        // setNaUse(annotations[0]["use"] === "NA");
    }, [annotations]);

    const handleChange1 = () => {
        setBw(false);
    }

    const updateAnnotation = () => {
        const newAnnotation = {
            id: id,
            colour: bw ? "black and white" : grey ? "grey" : colour ? "colour" : "",
            use: "",
            legend: "",
            maptype: "",
            number: "",
            difficulty: "",
        };

        console.log(newAnnotation.colour);

        // fetch(`https://express-backend-vfm5.onrender.com/update/${newAnnotation.id.toString()}/${newAnnotation.user.toString()}`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(newAnnotation),
        // })
    }

    return (
        <div>
        {/* only finish this part currently */}
        <Stack direction="row" spacing={1}>
            <Tooltip title="Black and white">
                <Checkbox checked={bw || bw0} icon={<ContrastIcon />} onChange={() => setBw(true) & setColour(false) & setGrey(false)} checkedIcon={<ContrastIcon color={bw? "inherit" : "secondary"}/>} />
            </Tooltip>
            <Tooltip title="Colour">
                <Checkbox checked={colour || colour0} icon={<ColorLensIcon />} onChange={() => setBw(false) & setColour(true) & setGrey(false)} checkedIcon={<ColorLensIcon color={colour? "inherit" : "secondary"}/>} />
            </Tooltip>
            <Tooltip title="Grey">
                <Checkbox checked={grey || grey0} icon={<FilterBAndWTwoToneIcon />} onChange={() => setBw(false) & setColour(false) & setGrey(true)} checkedIcon={<FilterBAndWTwoToneIcon color={grey? "inherit" : "secondary"} />} />
            </Tooltip>
        </Stack>



        <Stack direction="row" spacing={1}>
            <Tooltip title="Aesthetics">
                <Checkbox checked={aesthetics} icon={<LocalFloristIcon />} checkedIcon={<LocalFloristIcon color="inherit"/>} />
            </Tooltip>
            <Tooltip title="Colour mapping">
                <Checkbox checked={mapping} icon={<BarChartIcon />} checkedIcon={<BarChartIcon color="inherit"/>} />
            </Tooltip>
            <Tooltip title="Depth perception">
                <Checkbox checked={depth} icon={<ThreeDRotationIcon />} checkedIcon={<ThreeDRotationIcon color="inherit"/>} />
            </Tooltip>
            <Tooltip title="Not sure">
                <Checkbox checked={uncertainUse} icon={<QuestionMarkRoundedIcon />} checkedIcon={<QuestionMarkRoundedIcon color="inherit"/>} />
            </Tooltip>
            <Tooltip title="NA">
                <Checkbox checked={naUse} icon={<NotInterestedRoundedIcon />} checkedIcon={<NotInterestedRoundedIcon color="inherit"/>} />
            </Tooltip>
        </Stack>
        
        <Stack direction="row" spacing={1}>
            <Tooltip title="Mapping legend">
                <Checkbox icon={<ArtTrackIcon />} checkedIcon={<ArtTrackIcon color="inherit"/>} />
            </Tooltip>
            <Tooltip title="No legend">
                <Checkbox icon={<InsertPhotoRoundedIcon />} checkedIcon={<InsertPhotoRoundedIcon color="inherit"/>} />
            </Tooltip>
            <Tooltip title="Not sure">
                <Checkbox icon={<QuestionMarkRoundedIcon />} checkedIcon={<QuestionMarkRoundedIcon color="inherit"/>} />
            </Tooltip>
        </Stack>

        <Stack direction="row" spacing={1}>
            <Tooltip title="Continuous">
                <Checkbox icon={<SignalCellular0BarIcon />} checkedIcon={<SignalCellular0BarIcon color="inherit"/>} />
            </Tooltip>
            <Tooltip title="Categorical">
                <Checkbox icon={<SignalCellularAltIcon />} checkedIcon={<SignalCellularAltIcon color="inherit"/>} />
            </Tooltip>
        </Stack>

        <Stack direction="row" spacing={1}>
            <TextField size="small" variant="standard"></TextField>
            <Tooltip title="NA">
                <Checkbox icon={<NotInterestedRoundedIcon />} checkedIcon={<NotInterestedRoundedIcon color="inherit"/>} />
            </Tooltip>
        </Stack>

        <Stack direction="row" spacing={1}>
            <Tooltip title="Very easy">
                <Checkbox icon={<SentimentVerySatisfiedRoundedIcon />} checkedIcon={<SentimentVerySatisfiedRoundedIcon color="inherit"/>} />
            </Tooltip>
            <Tooltip title="Easy">
                <Checkbox icon={<SentimentSatisfiedRoundedIcon />} checkedIcon={<SentimentSatisfiedRoundedIcon color="inherit"/>} />
            </Tooltip>
            <Tooltip title="Neutral">
                <Checkbox icon={<SentimentNeutralRoundedIcon />} checkedIcon={<SentimentNeutralRoundedIcon color="inherit"/>} />
            </Tooltip>
            <Tooltip title="Difficult">
                <Checkbox icon={<SentimentDissatisfiedRoundedIcon />} checkedIcon={<SentimentDissatisfiedRoundedIcon color="inherit"/>} />
            </Tooltip>
            <Tooltip title="Very difficult">
                <Checkbox icon={<SentimentVeryDissatisfiedRoundedIcon />} checkedIcon={<SentimentVeryDissatisfiedRoundedIcon color="inherit"/>} />
            </Tooltip>
        </Stack>

        <Stack spacing={2}>
            <Button variant="contained" onClick={() => updateAnnotation()} disabled={true}> UPDATE </Button>
        </Stack>
    </div>
    )
}