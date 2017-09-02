/**
 * Created by seaasun on 2017/9/1.
 */
export default {
  test: [
    {
      'name': 'root',
      'id': 'root',
      'showOption': false,
      'options': ['addDic', 'addArray', 'addMany', 'addKv'],
      'd': 1
    },
    {
      'name': 'addKv',
      'type': 'string',
      'id': 'addKv',
      'value': 'ssss'
    },
    {
      'name': 'addDic',
      'type': 'object',
      'id': 'addDic',
      'options': ['addDic', 'addArray', 'addMany', 'addKv']
    },
    {
      'name': 'addArray',
      'id': 'addArray',
      'type': 'array'
    },
    {
      'name': 'addMany',
      'id': 'addMany',
      'type': 'array',
      'showOption': true,
      'options': ['addDic', 'addArray', 'addMany'],
      'value': [
        {
          'name': 'ss',
          'value': 'abc'
        },
        {
          'name': 'ss2',
          'value': 'abc2'
        }
      ]
    }
  ]
}
