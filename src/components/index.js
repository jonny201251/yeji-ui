import LoadingButton from './LoadingButton';
import ToolBarButton from './ToolBarButton';
import OperateButton from './OperateButton';
import BaseProTable from './BaseProTable';
import { InputNumber } from 'antd';

//NumberPicker
const NumberPicker = (props) => {
  return <InputNumber controls={false} {...props} />;
};
export {
  LoadingButton,
  ToolBarButton,
  OperateButton,
  BaseProTable,
  NumberPicker,
};
