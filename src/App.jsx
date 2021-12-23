import React from 'react'

class App extends React.Component {
  state = {
    post: [],
    loading: true,
    comments: [],
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => this.setState({ post: data, loading: false }))
  }

  componentDidUpdate() {}

  render() {
    return (
      <React.Fragment>
        <h3 className="h3">СТАТЬИ</h3>
        <h3 className="h3">ВСЕГО СТАТЕЙ: {this.state.post.length}</h3>
        {this.state.loading ? <h3 className="h3">ЗАГРУЗКА</h3> : <News data={this.state.post} />}
      </React.Fragment>
    )
  }
}

class News extends React.Component {
  renderNews = () => {
    const { data } = this.props // аналогично записи const data = this.props.data
    let newsTemplate = null

    if (data.length) {
      newsTemplate = data.map(function (item) {
        return <Article key={item.id} data={item} />
      })
    } else {
      newsTemplate = <p>К сожалению новостей нет</p>
    }
    return newsTemplate
  }

  render() {
    const { data } = this.props

    return (
      <div className="news">
        {this.renderNews()}
        {data.length ? <strong className={'news__count'}>Всего статей: {data.length}</strong> : null}
      </div>
    )
  }
}

class Article extends React.Component {
  render() {
    const { title, body, img } = this.props.data
    return (
      <div className="article">
        <p className="news__title">{title}</p>
        <img className="news__img" src={img} alt="foto"></img>
        <p className="news__text">{body}</p>
        <p className="news__date">{new Date().toLocaleString()}</p>
      </div>
    )
  }
}

export default App