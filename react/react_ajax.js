// Highscores component
class Persons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      loaded: false
    };
    this.onLoadClick = this.onLoadClick.bind(this);
    this.getPersons = this.getPersons.bind(this);
  }

  render() {
    // Jos dataa EI ole VIELÄ ladattu:
    if (!this.state.loaded) {
      return ( <
        div >
        <
        button onClick = {
          this.onLoadClick
        } > Näytä henkilöt < /button> <
        /div>
      );
    }
    // Näytetään haettu JSON-data:
    return ( <
      div >
      <
      p > < button onClick = {
        this.onLoadClick
      } > Lataa uudelleen < /button></p >
      <
      table border = "1" > < tbody > {
        this.state.persons.map((person, index) =>
          <
          tr key = {
            index
          } >
          <
          td > {
            person.id
          } < /td><td>{person.name}</td >
          <
          /tr>
        )
      } <
      /tbody></table >
      <
      /div>
    );
  }

  // Tyhjätään mahdollisesti aiemmin haettu data ja haetaan uudelleen
  onLoadClick() {
    this.setState({
      persons: [],
      loaded: false
    });
    this.getPersons();
  }

  // ladataan henkilötiedot TAPA1 (siistein)
  getPersons() {
    $.ajax({
      url: 'react_ajax.json',
      cache: false,
      dataType: 'json'
    }).done((data) => {
      this.setState({
        persons: data.persons,
        loaded: true
      });
    }).fail((jqXHR, textStatus, errorThrown) => {
      console.log(textStatus + ":" + errorThrown);
    });
  }

  /*
    // ladataan henkilötiedot TAPA2
    // https://stackoverflow.com/questions/39564938/getting-setstate-is-not-a-function
    getPersons = () => {
        $.ajax({
            url: 'react11-99.json',
            cache: false,
            dataType: 'json'
        }).done(function(data) {
            this.setState({persons: data.persons, loaded:true});
        }.bind(this)).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus+":"+errorThrown);
        });
    }
  */

  /*
    // ladataan henkilötiedot TAPA3 (vanha)
   // https://stackoverflow.com/questions/39564938/getting-setstate-is-not-a-function

    getPersons () {
        var me = this;
        $.ajax({
            url: 'react11-99.json',
            cache: false,
            dataType: 'json'
        }).done(function(data) {
            me.setState({persons: data.persons, loaded:true});
        }).fail(function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus+":"+errorThrown);
        });
    }
    */
}

// render component
ReactDOM.render( <
  Persons / > ,
  document.getElementById("root")
);