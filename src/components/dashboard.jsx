import { useState} from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Icon,
    Text
} from "@chakra-ui/react"
import DATA from "../data";


const dashboard = () => {

    const [data, setData] = useState(DATA);

    
  return (
    <div>dashboard</div>
  )
}

export default dashboard