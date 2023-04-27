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
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import SentimentNeutralRoundedIcon from '@mui/icons-material/SentimentNeutralRounded';
import SentimentDissatisfiedRoundedIcon from '@mui/icons-material/SentimentDissatisfiedRounded';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';

export default function ValidationIcons({annotations}) {

    const user = "inherit";

    return (
        <div>
        <Stack direction="row" spacing={1}>
            <Tooltip title="Black and white">
                <Checkbox icon={<ContrastIcon />} checkedIcon={<ContrastIcon color={user}/>} />
            </Tooltip>
            <Tooltip title="Colour">
                <Checkbox icon={<ColorLensIcon />} checkedIcon={<ColorLensIcon color={user}/>} />
            </Tooltip>
            <Tooltip title="Grey">
                <Checkbox icon={<FilterBAndWTwoToneIcon />} checkedIcon={<FilterBAndWTwoToneIcon color={user}/>} />
            </Tooltip>
        </Stack>

        <Stack direction="row" spacing={1}>
            <IconButton color="inherit">
                <LocalFloristIcon />
            </IconButton>
            <IconButton color="inherit">
                <BarChartIcon />
            </IconButton>
            <IconButton color="inherit">
                <ThreeDRotationIcon />
            </IconButton>
            <IconButton color="inherit">
                <QuestionMarkRoundedIcon value="Not sure"/>
            </IconButton>
            <IconButton color="inherit">
                <NotInterestedRoundedIcon />
            </IconButton>
        </Stack>
        <Stack direction="row" spacing={1}>
            <IconButton color="inherit">
                <ArtTrackIcon />
            </IconButton>
            <IconButton color="inherit">
                <InsertPhotoRoundedIcon />
            </IconButton>
            <IconButton color="inherit">
                <QuestionMarkRoundedIcon />
            </IconButton>
        </Stack>
        <Stack direction="row" spacing={1}>
            <Button color="inherit" size="small" variant="text">Continuous</Button>
            <Button color="inherit" size="small" variant="text">Categorical</Button>
            <Button color="inherit" size="small" variant="text">Both</Button>
        </Stack>
        <Stack direction="row" spacing={1}>
            <TextField size="small" variant="standard"></TextField>
            <IconButton color="inherit">
                <NotInterestedRoundedIcon />
            </IconButton>
        </Stack>
        <Stack direction="row" spacing={1}>
            <IconButton color="inherit">
                <SentimentVerySatisfiedRoundedIcon />
            </IconButton>
            <IconButton color="inherit">
                <SentimentSatisfiedRoundedIcon />
            </IconButton>
            <IconButton color="inherit">
                <SentimentNeutralRoundedIcon />
            </IconButton>
            <IconButton color="inherit">
                <SentimentDissatisfiedRoundedIcon />
            </IconButton>
            <IconButton color="inherit">
                <SentimentVeryDissatisfiedRoundedIcon />
            </IconButton>
        </Stack>
    </div>
    )
}