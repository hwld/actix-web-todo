import { Checkbox, CheckboxProps } from "@chakra-ui/checkbox";
import styled from "@emotion/styled";

type Props = {
  width?: string;
  height?: string;
  borderRadius?: string;
  iconWidth?: string;
};

const Component: React.FC<Omit<CheckboxProps, keyof Props> & Props> = (
  props
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { iconWidth, ...rest } = props;

  return <Checkbox {...rest} />;
};

export const TodoCheckBox = styled(Component)<Props>`
  & > span {
    width: ${(props) => props.width || "20px"};
    height: ${(props) => props.height || "20px"};
    border-radius: ${(props) => props.borderRadius || "0px"};

    & svg {
      width: ${(props) => props.iconWidth || "10px"};
    }
  }
`;
