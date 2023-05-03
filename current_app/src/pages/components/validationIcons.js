import React, { useEffect, useState } from "react";
import { Button, Stack, TextField, Tooltip, Checkbox } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ContrastIcon from '@mui/icons-material/Contrast';
import FilterBAndWTwoToneIcon from '@mui/icons-material/FilterBAndWTwoTone';
import BarChartIcon from '@mui/icons-material/BarChart';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import NotInterestedRoundedIcon from '@mui/icons-material/NotInterestedRounded';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import SignalCellular0BarIcon from '@mui/icons-material/SignalCellular0Bar';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import SentimentNeutralRoundedIcon from '@mui/icons-material/SentimentNeutralRounded';
import SentimentDissatisfiedRoundedIcon from '@mui/icons-material/SentimentDissatisfiedRounded';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';

export default function ValidationIcons({annotations, id, user}) {

    const q1 = ["black and white", "grey", "colour"];
    const q2 = ["aesthetics", "colour-mapping", "depth-perception", "uncertain", "NA"];
    const q3 = ["legend", "n-legend", "uncertain"];
    const q4 = ["continuous", "categorical", "both", "uncertain"];
    const q6 = ["1", "2", "3", "4", "5"];

    // init the current user's annotation
    // q1
    const [bw, setBw] = useState(false);
    const [grey, setGrey] = useState(false);
    const [colour, setColour] = useState(false);
    // q2
    const [aesthetics, setAesthetics] = useState(false);
    const [mapping, setMapping] = useState(false);
    const [depth, setDepth] = useState(false);
    const [uncertainUse, setUncertainUse] = useState(false);
    const [naUse, setNaUse] = useState(false);
    // q3
    const [legend, setLegend] = useState(false);
    const [nlegend, setNLegend] = useState(false);
    const [ulegend, setULegend] = useState(false);
    // q4
    const [continuous, setContinuous] = useState(false);
    const [categorical, setCategorical] = useState(false);
    const [both, setBoth] = useState(false);
    const [uType, setUType] = useState(false);
    // q5
    const [number, setNumber] = useState(annotations[0]["number"]);
    // q6
    const [veryEasy, setVEasy] = useState(false);
    const [easy, setEasy] = useState(false);
    const [neutral, setNeutral] = useState(false);
    const [hard, setHard] = useState(false);
    const [veryHard, setVHard] = useState(false);


    // set the other user's annotation as fixed value
    // q1
    const bw0 = annotations[1]["colour"] === q1[0];
    const grey0 = annotations[1]["colour"] === q1[1];
    const colour0 = annotations[1]["colour"] === q1[2];
    // q2
    const aesthetics0 = annotations[1]["use"] === q2[0];
    const mapping0 = annotations[1]["use"] === q2[1];
    const depth0 = annotations[1]["use"] === q2[2];
    const uncertainUse0 = annotations[1]["use"] === q2[3];
    const naUse0 = annotations[1]["use"] === q2[4];
    // q3
    const legend0 = annotations[1]["legend"] === q3[0];
    const nlegend0 = annotations[1]["legend"] === q3[1];
    const ulegend0 = annotations[1]["legend"] === q3[2];
    // q4
    const continuous0 = annotations[1]["maptype"] === q4[0];
    const categorical0 = annotations[1]["maptype"] === q4[1];
    const both0 = annotations[1]["maptype"] === q4[2];
    const uType0 = annotations[1]["maptype"] === q4[3];
    // q6
    const veryEasy0 = annotations[1]["difficulty"] === q6[0];
    const easy0 = annotations[1]["difficulty"] === q6[1];
    const neutral0 = annotations[1]["difficulty"] === q6[2];
    const hard0 = annotations[1]["difficulty"] === q6[3];
    const veryHard0 = annotations[1]["difficulty"] === q6[4];


    // set the current user's annotations
    useEffect(() => {
        // q1
        setBw(annotations[0]["colour"] === q1[0]);
        setGrey(annotations[0]["colour"] === q1[1]);
        setColour(annotations[0]["colour"] === q1[2]);
        // q2
        setAesthetics(annotations[0]["use"] === q2[0]);
        setMapping(annotations[0]["use"] === q2[1]);
        setDepth(annotations[0]["use"] === q2[2]);
        setUncertainUse(annotations[0]["use"] === q2[3]);
        setNaUse(annotations[0]["use"] === q2[4]);
        // q3
        setLegend(annotations[0]["legend"] === q3[0]);
        setNLegend(annotations[0]["legend"] === q3[1]);
        setULegend(annotations[0]["legend"] === q3[2]);
        // q4
        setContinuous(annotations[0]["maptype"] === q4[0]);
        setCategorical(annotations[0]["maptype"] === q4[1]);
        setBoth(annotations[0]["maptype"] === q4[2]);
        setUType(annotations[0]["maptype"] === q4[3]);
        // q5
        setNumber(annotations[0]["number"]);
        // q6
        setVEasy(annotations[0]["difficulty"] === q6[0]);
        setEasy(annotations[0]["difficulty"] === q6[1]);
        setNeutral(annotations[0]["difficulty"] === q6[2]);
        setHard(annotations[0]["difficulty"] === q6[3]);
        setVHard(annotations[0]["difficulty"] === q6[4]);
    }, [annotations]);

    const updateAnnotation = () => {
        const newAnnotation = {
            id: id,
            user: user,
            colour: bw ? q1[0] : grey ? q1[1] : colour ? q1[2] : "",
            use: aesthetics ? q2[0] : mapping ? q2[1] : depth ? q2[2] : uncertainUse ? q2[3] : naUse ? q2[4] : "",
            legend: legend ? q3[0] : nlegend ? q3[1] : ulegend ? q3[2] : "",
            maptype: continuous ? q4[0] : categorical ? q4[1] : both ? q4[2] : uType ? q4[3] : "",
            number: number,
            difficulty: veryEasy ? q6[0] : easy ? q6[1] : neutral ? q6[2] : hard ? q6[3] : veryHard ? q6[4] : "",
        };

        console.log(newAnnotation);

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
        {/* only finish this part currently */}
        <Stack direction="row" spacing={1}>
            <Tooltip title="Black and white">
                <Checkbox 
                    checked={bw || bw0} 
                    icon={<ContrastIcon />} 
                    onChange={() => setBw(true) & setColour(false) & setGrey(false)} 
                    checkedIcon={<ContrastIcon color={bw && bw0 ? "success" : bw ? "primary" : "secondary"}/>}
                />
            </Tooltip>
            <Tooltip title="Colour">
                <Checkbox
                    checked={colour || colour0}
                    icon={<ColorLensIcon />}
                    onChange={() => setBw(false) & setColour(true) & setGrey(false)}
                    checkedIcon={<ColorLensIcon color={colour && colour0 ? "success" : colour? "primary" : "secondary"}/>}
                />
            </Tooltip>
            <Tooltip title="Grey">
                <Checkbox
                    checked={grey || grey0}
                    icon={<FilterBAndWTwoToneIcon />}
                    onChange={() => setBw(false) & setColour(false) & setGrey(true)}
                    checkedIcon={<FilterBAndWTwoToneIcon color={grey && grey0? "success" : grey? "primary" : "secondary"} />}
                />
            </Tooltip>
        </Stack>

        <Stack direction="row" spacing={1}>
            <Tooltip title="Aesthetics">
                <Checkbox
                    checked={aesthetics || aesthetics0}
                    icon={<LocalFloristIcon />}
                    onChange={() => setAesthetics(true) & setMapping(false) & setDepth(false) & setUncertainUse(false) & setNaUse(false)}
                    checkedIcon={<LocalFloristIcon color={aesthetics && aesthetics0? "success" : aesthetics? "primary" : "secondary"} />}
                />
            </Tooltip>
            <Tooltip title="Colour mapping">
                <Checkbox
                    checked={mapping || mapping0}
                    icon={<BarChartIcon />}
                    onChange={() => setAesthetics(false) & setMapping(true) & setDepth(false) & setUncertainUse(false) & setNaUse(false)}
                    checkedIcon={<BarChartIcon color={mapping && mapping0? "success" : mapping? "primary" : "secondary"}/>}
                />
            </Tooltip>
            <Tooltip title="Depth perception">
                <Checkbox
                    checked={depth || depth0}
                    icon={<ThreeDRotationIcon />}
                    onChange={() => setAesthetics(false) & setMapping(false) & setDepth(true) & setUncertainUse(false) & setNaUse(false)}
                    checkedIcon={<ThreeDRotationIcon color={depth && depth0? "success" : depth? "primary" : "secondary"}/>}
                />
            </Tooltip>
            <Tooltip title="Not sure">
                <Checkbox
                    checked={uncertainUse || uncertainUse0}
                    icon={<QuestionMarkRoundedIcon />}
                    onChange={() => setAesthetics(false) & setMapping(false) & setDepth(false) & setUncertainUse(true) & setNaUse(false)}
                    checkedIcon={<QuestionMarkRoundedIcon color={uncertainUse && uncertainUse0? "success" : uncertainUse? "primary" : "secondary"}/>}
                />
            </Tooltip>
            <Tooltip title="NA">
                <Checkbox
                    checked={naUse || naUse0}
                    icon={<NotInterestedRoundedIcon />}
                    onChange={() => setAesthetics(false) & setMapping(false) & setDepth(false) & setUncertainUse(false) & setNaUse(true)}
                    checkedIcon={<NotInterestedRoundedIcon color={naUse && naUse0? "success" : naUse? "primary" : "secondary"} />}
                />
            </Tooltip>
        </Stack>
        
        <Stack direction="row" spacing={1}>
            <Tooltip title="Mapping legend">
                <Checkbox
                    checked={legend || legend0}
                    icon={<ArtTrackIcon />}
                    onChange={() => setLegend(true) & setNLegend(false) & setULegend(false)}
                    checkedIcon={<ArtTrackIcon color={legend && legend0? "success" : legend? "primary" : "secondary"} />}
                />
            </Tooltip>
            <Tooltip title="No legend">
                <Checkbox
                    checked={nlegend || nlegend0}
                    icon={<InsertPhotoRoundedIcon />}
                    onChange={() => setLegend(false) & setNLegend(true) & setULegend(false)}
                    checkedIcon={<InsertPhotoRoundedIcon color={nlegend && nlegend0? "success" : nlegend? "primary" : "secondary"}/>}
                />
            </Tooltip>
            <Tooltip title="Not sure">
                <Checkbox
                    checked={ulegend || ulegend0}
                    icon={<QuestionMarkRoundedIcon />}
                    onChange={() => setLegend(false) & setNLegend(false) & setULegend(true)}
                    checkedIcon={<QuestionMarkRoundedIcon color={ulegend && ulegend0? "success" : ulegend? "primary" : "secondary"}/>}
                />
            </Tooltip>
        </Stack>

        <Stack direction="row" spacing={1}>
            <Tooltip title="Continuous">
                <Checkbox
                    checked={continuous || continuous0}
                    icon={<SignalCellular0BarIcon />}
                    onChange={() => setContinuous(true) & setCategorical(false) & setBoth(false) & setUType(false)}
                    checkedIcon={<SignalCellular0BarIcon color={continuous && continuous0? "success" : continuous? "primary" : "secondary"} />}
                />
            </Tooltip>
            <Tooltip title="Categorical">
                <Checkbox
                    checked={categorical || categorical0}
                    icon={<SignalCellularAltIcon />}
                    onChange={() => setContinuous(false) & setCategorical(true) & setBoth(false) & setUType(false)}
                    checkedIcon={<SignalCellularAltIcon color={categorical && categorical0? "success" : categorical? "primary" : "secondary"}/>}
                />
            </Tooltip>
            <Tooltip title="Both">
                <Checkbox
                    checked={both || both0}
                    icon={<LooksTwoIcon />}
                    onChange={() => setContinuous(false) & setCategorical(false) & setBoth(true) & setUType(false)}
                    checkedIcon={<LooksTwoIcon color={both && both0? "success" : both? "primary" : "secondary"}/>}
                />
            </Tooltip>
            <Tooltip title="Not sure">
                <Checkbox
                    checked={uType || uType0}
                    icon={<QuestionMarkRoundedIcon />}
                    onChange={() => setContinuous(false) & setCategorical(false) & setBoth(false) & setUType(true)}
                    checkedIcon={<QuestionMarkRoundedIcon color={uType && uType0? "success" : uType? "primary" : "secondary"}/>}
                />
            </Tooltip>
        </Stack>

        <Stack direction="row" spacing={1}>
            <TextField size="small" focused value={number} onChange={(e) => setNumber(e.target.value)}
                color={number===annotations[1]["number"]? "success" : "primary" }
            />
            <TextField size="small" value={annotations[1]["number"]} disabled />
        </Stack>

        <Stack direction="row" spacing={1}>
            <Tooltip title="Very easy">
                <Checkbox
                    checked={veryEasy || veryEasy0}
                    icon={<SentimentVerySatisfiedRoundedIcon />}
                    onChange={() => setVEasy(true) & setEasy(false) & setNeutral(false) & setHard(false) & setVHard(false)}
                    checkedIcon={<SentimentVerySatisfiedRoundedIcon color={veryEasy && veryEasy0? "success" : veryEasy? "primary" : "secondary"}/>}
                />
            </Tooltip>
            <Tooltip title="Easy">
                <Checkbox
                    checked={easy || easy0}
                    icon={<SentimentSatisfiedRoundedIcon />}
                    onChange={() => setVEasy(false) & setEasy(true) & setNeutral(false) & setHard(false) & setVHard(false)}
                    checkedIcon={<SentimentSatisfiedRoundedIcon color={easy && easy0? "success" : easy? "primary" : "secondary"}/>}
                />
            </Tooltip>
            <Tooltip title="Neutral">
                <Checkbox
                    checked={neutral || neutral0}
                    icon={<SentimentNeutralRoundedIcon />}
                    onChange={() => setVEasy(false) & setEasy(false) & setNeutral(true) & setHard(false) & setVHard(false)}
                    checkedIcon={<SentimentNeutralRoundedIcon color={neutral && neutral0? "success" : neutral? "primary" : "secondary"}/>}
                />
            </Tooltip>
            <Tooltip title="Difficult">
                <Checkbox
                    checked={hard || hard0}
                    icon={<SentimentDissatisfiedRoundedIcon />}
                    onChange={() => setVEasy(false) & setEasy(false) & setNeutral(false) & setHard(true) & setVHard(false)}
                    checkedIcon={<SentimentDissatisfiedRoundedIcon color={hard && hard0? "success" : hard? "primary" : "secondary"}/>}
                />
            </Tooltip>
            <Tooltip title="Very difficult">
                <Checkbox
                    checked={veryHard || veryHard0}
                    icon={<SentimentVeryDissatisfiedRoundedIcon />}
                    onChange={() => setVEasy(false) & setEasy(false) & setNeutral(false) & setHard(false) & setVHard(true)}
                    checkedIcon={<SentimentVeryDissatisfiedRoundedIcon color={veryHard && veryHard0? "success" : veryHard? "primary" : "secondary"}/>}
                />
            </Tooltip>
        </Stack>

        <Stack spacing={2}>
            <Button variant="contained" onClick={() => updateAnnotation()}>UPDATE</Button>
        </Stack>
    </div>
    )
}