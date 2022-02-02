import { useState } from 'react'

function UserPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        测试 SSR
        
        userPage页面
      </header>
    </div>
  )
}

export default UserPage
