import Header from '../../components/header';
import PriceList from '../../components/PriceList';
import { Tabs, Tab } from '../../components/Tabs';
import { Table, TableColumn } from '../../components/Table';
import DiaLog from '../../components/DiaLog'

const items = [
  {
    "id": 1,
    "title": "去云南旅游",
    "price": 200,
    "date": "2018-08-01",
    "category": {
      "id": 1,
      "name": "旅行",
      "type": "outname",
    },
  },
  {
    "id": 2,
    "title": "去云南旅游",
    "price": 300,
    "date": "2018-08-01",
    "category": {
      "id": 1,
      "name": "旅行",
      "type": "outname",
    },
  },
];

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  show() {
    this.refs.d1.onOpen();
  }
  a() {
    console.log('111');
  }
  b() {
    console.log('2222');
  }

  check() {
    this.refs.d2.onOpen();
  }

  render() {
    const { visible, isShow } = this.state;
    return (
      <article>
        <Header />
        <section className="main page-home">
          <PriceList
            items={items}
            onModifyItem={(item) => {alert(item.id)}}
            onDeleteItem={(item) => {alert(item.id)}}
          />
          <Tabs activeIndex={0} onTabChange={() => {}}>
            <Tab>1st item</Tab>
            <Tab>2nd item</Tab>
          </Tabs>
        
          <Table data={items} width="100%">
            <TableColumn prop="id" width="50" label="序号" />
            <TableColumn prop="title" label="内容" />
            <TableColumn prop="date" width="150" label="日期" />
            <TableColumn>
              <span onClick={this.show.bind(this)}>修改</span>
              <span onClick={this.check.bind(this)}>查看</span>
            </TableColumn>
          </Table>
        
          <DiaLog
            ref="d1"
            visible={true}
            title="对话框"
            buttons={[
              {text: '取消', func: this.a},
              {text: '保存', func: this.b},
            ]}
          >
            sssss
          </DiaLog>

          <DiaLog
            ref="d2"
            visible={false}
            title="日志"
          >
            111
          </DiaLog>
        </section>
      </article>
    )
  }
}

//*********context传值 */
// router页面中
// import AppContext from '../../static/util/AppContext';

// 父组件传值
// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       items: items,
//     }
//   }

//   render() {
//     return (
//       <AppContext.Provider value={{
//         state: this.state,
//       }}>
//         <Router></Router>
//       </AppContext.Provider>
//     )
//   }
// }

// 子组件使用
// render() {
//   return (
//     <AppContext.Consumer>
//       {({ state }) => {
//         console.log(state);
//         return (
//           <div>子页面内容</div>
//         )
//       }}
//     </AppContext.Consumer>
//   )
// }

//或使用components/withContext.jsx高阶组件
//只需要包裹在组件名外面即可
//如：withContext(Home)