import { useState } from 'react';
import styled from 'styled-components';
import background2 from './resource/images/background2.jpg';

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: aliceblue;
  color: white;
  padding-top: 8vh;
  header {
    position: relative;
    .darkLight {
      position: absolute;
      padding: 5px 10px;
      bottom: 10vh;
      left: 50vw;
      width: 100px;
    }
  }

  main {
    form {
      display: flex;
      gap: 2vw;
      margin: 10px auto 50px auto;
      input {
        width: 40vw;
        padding: 15px;
        border: none;
        border-radius: 5px;
        box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
      }
      button {
        width: 9vw;
        padding: 10px;
        border: none;
        border-radius: 5px;
        box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
        letter-spacing: 1px;
        :hover {
          background-color: red;
          color: white;
          font-weight: bold;
        }
      }
    }
    article {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border: 1px solid transparent;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.3);
      width: 50vw;
      padding: 5px 20px;

      h2 {
        display: flex;
        align-items: center;
        font-weight: bold;
        color: green;
        font-size: 30px;
        letter-spacing: 1px;
        background-color: rgba(0, 0, 0, 0.4);
        padding: 5px 50px;
        border-radius: 5px;
      }
      ul {
        font-size: 20px;
        li {
          display: flex;
          align-items: center;
          list-style-type: none;
          font-weight: bold;
          color: #e5e5e5;
        }
        p,
        a {
          font-weight: 400;
          padding-left: 10px;
          color: white;
          font-size: 18px;
        }
        a:hover {
          padding-left: 10px;
          color: tomato;
        }
      }
    }
  }

  @media only screen and (max-width: 390px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-color: aliceblue;
    color: white;
    padding: 8vh;
    header {
      position: relative;
      margin-top: -10px;
      h1 {
        font-size: 30px;
      }
      .darkLight {
        position: absolute;
        padding: 5px;
        bottom: 15vh;
        left: 60vw;
        width: 80px;
        font-size: 10px;
      }
    }
    main {
      form {
        flex-direction: column;
        align-items: center;
        input {
          width: 80vw;
          margin-top: -10px;
        }
        button {
          margin-top: 2vh;
          width: 30vw;
        }
      }
      article {
        width: 80vw;
        padding: 0 30px;
        margin-top: -30px;

        h2 {
          display: flex;
          align-items: center;
          font-weight: bold;
          color: green;
          font-size: 20px;
          letter-spacing: 1px;
          background-color: rgba(0, 0, 0, 0.4);
          padding: 5px 20px;
        }
        ul {
          font-size: 8px;
          li {
            display: flex;
            align-items: center;
            list-style-type: none;
            font-weight: bold;
            color: #e5e5e5;
            font-size: 16px;
          }
          p,
          a {
            font-weight: 400;
            padding-left: 10px;
            color: white;
            font-size: 12px;
          }
          a:hover {
            padding-left: 10px;
            color: tomato;
          }
        }
      }
    }
  }
`;

function App() {
  const [countryData, setCountryData] = useState<any>(null);
  const [light, setLight] = useState(true);

  function searchButton(e: any) {
    e.preventDefault();
    const searchTerm = e.target.form[0].value;
    fetch(`https://restcountries.com/v3.1/name/${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setCountryData(data[0]));
  }

  return (
    <div>
      <AppContainer
        style={{
          backgroundImage: light ? `url(${background2})` : '',
          backgroundColor: !light ? 'black' : '',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <header>
          <button
            className="darkLight"
            onClick={() => setLight(!light)}
            style={{
              backgroundColor: light ? 'black' : 'white',
              color: light ? 'white' : 'black',
            }}
          >
            Dark-Light
          </button>
          <h1>Find your country 🤩</h1>
        </header>
        <main>
          <form>
            <input type="text" placeholder="Country name" />
            <button onClick={searchButton}>Search</button>
          </form>
          {countryData && (
            <article>
              <h2> {`${countryData.altSpellings[1]}  ${countryData.flag}`}</h2>
              <ul>
                <li>
                  Capital:
                  <p>{` ${countryData.capital}`}</p>
                </li>
                <li>
                  Area:
                  <p>{` ${countryData.area} km`}</p>
                </li>
                <li>
                  Borders:
                  <p>{` ${countryData.borders}`}</p>
                </li>
                <li>
                  Google Map:
                  <a href={`${countryData.maps.googleMaps}`}>
                    {countryData.maps.googleMaps}
                  </a>
                </li>
                <li>
                  Continent:
                  <p>{` ${countryData.continents}`}</p>
                </li>
              </ul>
            </article>
          )}
        </main>
      </AppContainer>
    </div>
  );
}

export default App;
