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

export default function ValidationIcons({annotations, id, user}) {

    const colour = annotations[0]["colour"]==="black and white";
    
    
    const mapAnnotation = () => {
        
    }

    let newAnnotation = {
        id: id,
        colour: "",
        use: "",
        legend: "",
        maptype: "",
        number: "",
        difficulty: "",
    };

    const updateAnnotation = () => {       
        fetch(`https://express-backend-vfm5.onrender.com/update/${newAnnotation.id.toString()}/${newAnnotation.user.toString()}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAnnotation),
        })
    }

    return (
        <div>
        <Stack direction="row" spacing={1}>
            <Tooltip title="Black and white">
                <Checkbox checked={colour} icon={<ContrastIcon />} checkedIcon={<ContrastIcon color="inherit"/>} />
            </Tooltip>
            <Tooltip title="Colour">
                <Checkbox icon={<ColorLensIcon />} checkedIcon={<ColorLensIcon color="inherit"/>} />
            </Tooltip>
            <Tooltip title="Grey">
                <Checkbox icon={<FilterBAndWTwoToneIcon />} checkedIcon={<FilterBAndWTwoToneIcon color="inherit"/>} />
            </Tooltip>
        </Stack>

        <Stack direction="row" spacing={1}>
            <Tooltip title="Aesthetics">
                <Checkbox icon={<LocalFloristIcon />} checkedIcon={<LocalFloristIcon color="inherit"/>} />
            </Tooltip>
            <Tooltip title="Colour mapping">
                <Checkbox icon={<BarChartIcon />} checkedIcon={<BarChartIcon color="inherit"/>} />
            </Tooltip>
            <Tooltip title="Depth perception">
                <Checkbox icon={<ThreeDRotationIcon />} checkedIcon={<ThreeDRotationIcon color="inherit"/>} />
            </Tooltip>
            <Tooltip title="Not sure">
                <Checkbox icon={<QuestionMarkRoundedIcon />} checkedIcon={<QuestionMarkRoundedIcon color="inherit"/>} />
            </Tooltip>
            <Tooltip title="NA">
                <Checkbox icon={<NotInterestedRoundedIcon />} checkedIcon={<NotInterestedRoundedIcon color="inherit"/>} />
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