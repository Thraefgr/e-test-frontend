import { Flex, Input, Typography } from "antd";

export default function ProfileField({label, value, onChange, readOnly, number={}}) {
    return (
        <Flex align="center" gap="1rem" wrap>
            <Typography.Text style={{fontSize:"2rem"}}>{label}:</Typography.Text>
            <Input onChange={onChange} style={{fontSize:"2rem", width:"fit-content"}} variant={readOnly && "borderless"} value={value} readOnly={readOnly} type={number.value && "number"} max={number.max}/>
        </Flex>
    )
}