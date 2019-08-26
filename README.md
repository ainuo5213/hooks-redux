# 使用这个库可以实现hooks替代redux的效果
### 安装
````
for npm: npm install hooks-redux
for yarn: yarn add hooks-redux
````
#### 使用
### 根组件APP的配置
````javascript
const App = () => {
    return (
        <div className="todoapp" >
            <Header/>
        </div>
    )
}
 // 使用方法如下：仅需传入reducer和初始化参数即可
 // 第一个参数时reduer，可以是一个reducer，也可以是多个reducer
 // 第二个参数是初始值，其个数必须和reducer一样多
 // APP是包装的组件
export default withContext(
    {
        Todo, 
        Count
    },
    {
        Todo: TododefaultState, 
        Count: CountDefaultState
    })(App)
````
### 使用state、dispatch方法的组件
````javascript
 import {useContext} from 'react'
 import {hooksContext} from 'hooks-redux'
 
 const {state, dispatch} = useContext(hooksContext)
````
