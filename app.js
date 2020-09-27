
  //Loading Cmponent

  class Loading extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        text: 'Loading'
      };
    }
    componentDidMount() {
      const stopper = this.state.text + '...';

      this.interval = window.setInterval(() => {
        this.state.text === stopper
          ? this.setState(() => ({ text: 'Loading' }))
          : this.setState((prevState) => ({ text: prevState.text + '.' }))
      }, 300)
    }
    componentWillUnmount() {
      window.clearInterval(this.interval);
    }
    render() {
      return (
        <p>
          {this.state.text}
        </p>
      )
    }
  }
  

  //InputField Componet//
  class InputField extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        value : '',
      }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleOnchange = this.handleOnchange.bind(this)
    }


    //handle input change
    handleOnchange(text){
      let placeholder = text.target.value
      this.setState(() => ({value:  placeholder})
      )
    }


    // handle Form submit
    handleSubmit(event){
      if (this.state.value === ""){
        event.preventDefault()
        return
      }
      else{
        handleLoading(this.state.value)
        this.props.inputLanguageEvent(this.state.value)
        event.preventDefault()
        this.setState({value:""})
      }
    }
    render(){
      return(
        <form
          onSubmit= {this.handleSubmit}>
          <fieldset>
            <legend> Github Repository</legend>
            <label htmlFor="input"> Seach:</label>
            <input type="text" placeholder= "Responsitory"
            onChange = {this.handleOnchange}
            value= {this.state.value}/>
            <input type="submit" value = "Get"/>
          </fieldset>
        </form>
      )
    }
  }

  
  //NavBar Cmponent
  class NavBar extends React.Component{
    constructor(props){
      super(props)
      this.state = {keyword: ['all', 'javascript', 'python', 'ruby']}
    }
    render(){
      return(
        <ul>
          {this.state.keyword.map((li,index) => {
            return (<li
                className = "navbar"
                onClick= {()=>{
                  this.props.selectLanguageEvent(li)
                  handleLoading(li)
                }}
                key= {index}>
                {li.toLocaleUpperCase()}
                  </li>)
            })}
        </ul>)
    
    }
  }


  //handle Promise loading Data
  function handleLoading (lang){
    this.setState({loading: true})
    
    window.API.fetchPopularRepos(lang)
    .then((data)=> this.setState({
      repos: data,
      loading: false,
    }))
    
  }

  //Render Constructor Repository Content When Loaded
  function Repository (props){      
    return (
      <ul>
        {props.onLoadedResult.map((repo)=>{
          return(
          <li key = {repo.id}>
            <span ><b>{repo.owner.login} || </b></span>
            <a href= {repo.html_url}
            target = "blank">{repo.name}</a>
            <span> || Fork: {repo.forks}</span>
            <p>{repo.description}</p>
          </li>
          )
        })}
      </ul>
    )
    
  }

  class App extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        loading: false,
        repos: [],
        activeLangue: 'all'
                    }
      this.handleSelectLanguage =this.handleSelectLanguage.bind(this)
      handleLoading = handleLoading.bind(this)
    }

    componentDidMount(){
      handleLoading(this.state.activeLangue)
    }


    handleSelectLanguage(lang){
      this.setState(()=>{
        return {activeLangue: lang}
      })
    }

    render() {
      return(
        <div>
          <InputField
          inputLanguageEvent = {this.handleSelectLanguage}/>
          <NavBar
          selectLanguageEvent = {this.handleSelectLanguage}/>
          <h3>ACTIVE LANGUAGE   --- {this.state.activeLangue.toLocaleUpperCase()} ---</h3>
          <hr/>
          {this.state.loading ? 
          <Loading/>
          :<div>
            <Repository onLoadedResult = {this.state.repos}/>
          </div>}
        </div>
      )
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )