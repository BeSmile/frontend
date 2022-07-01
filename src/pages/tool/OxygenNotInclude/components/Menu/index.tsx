/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-06-08 11:24:00
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-06-18 12:08:30
 */
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styles from "./index.module.less";
import { ControlledAccordionsProps } from "./types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%"
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            // flexBasis: '33.33%',
            flexShrink: 0
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary
        }
    })
);

const itemData = [
    {
        pos: {
            x: 1,
            y: 3
        }, // 这是坐标
        material: {
            id: 1, // 分配的id
            image: null, // 图片信息,
            url: "http://127.0.0.1:3000/public/images/oni/Power/SolarPanel.png"
        }, // 这是材质属性
        matrix: [
            [7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7]
        ],
        dimensions: [7, 3], // 占地
        type: "building",
        category: "Power",
        name: "SolarPanel"
    },
    {
        pos: {
            x: 0,
            y: 0
        }, // 这是坐标
        material: {
            id: 100, // 分配的id
            image: null, // 图片信息,
            url: "http://127.0.0.1:3000/public/images/oni/Oxygen/Deodorizer.png"
        }, // 这是材质属性
        matrix: [[100]],
        dimensions: [1, 1], // 占地
        type: "building",
        category: "Oxygen",
        name: "Deodorizer"
    },
    {
        pos: {
            x: 0,
            y: 0
        }, // 这是坐标
        material: {
            id: 111, // 分配的id
            image: null, // 图片信息,
            url: "http://127.0.0.1:3000/public/images/oni/Plumbing/LiquidBridge.png"
        }, // 这是材质属性
        matrix: [[111, 0, 111]],
        dimensions: [3, 1], // 占地
        type: "waterPipe",
        category: "Plumbing",
        name: "waterPipe"
    }
];

const ControlledAccordions: React.FC<ControlledAccordionsProps> = ({ handleDesign }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>("panel1");
    const handleChange = (panel: string) => (_, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClick = (data) => {
        handleDesign && handleDesign(data);
    };

    return (
        <div className={classes.root}>
            <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>General settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <section className={styles.blocks}>
                        {itemData.map((item: any) => (
                            <div
                                onClick={handleClick.bind(null, item)}
                                key={item.name}
                                className={styles.block}
                            >
                                <div className={styles.img}>
                                    <img src={item.material.url} alt="SolarPanel" />
                                </div>
                                <div className={styles.name}>{item.name}</div>
                            </div>
                        ))}
                    </section>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>Users</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                        varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}>Personal data</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet
                        egestas eros, vitae egestas augue. Duis vel est augue.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default ControlledAccordions;
