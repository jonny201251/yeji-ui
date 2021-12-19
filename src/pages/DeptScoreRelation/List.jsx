import { BaseProTable } from '../../components';
import { deptScoreRelationPath, get, sysDeptPath } from '../../utils';
import { useEffect, useState } from 'react';

export default () => {
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState([]);

  useEffect(async () => {
    const idNameMap = await get(sysDeptPath.getIdNameMap);
    if (idNameMap) {
      let tmp = [
        {
          title: '评分部门',
          dataIndex: 'scoreDeptName',
          valueType: 'text',
          render: (text, record) => idNameMap[record.scoreDeptId],
        },
      ];
      setColumns(tmp);
      setLoading(false);
    }
  }, []);

  return (
    !loading && (
      <BaseProTable
        path={deptScoreRelationPath}
        columns={columns}
        width={820}
        rowKey={'scoreDeptId'}
      />
    )
  );
};
