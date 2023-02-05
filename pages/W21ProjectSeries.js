import W21ProjectSeriesInfo from "../components/Page_Layout/W21ProjectSeriesInfo";
import Layout from "../components/Website_Layout/Layout";
import BackgroundImage from "../components/Page_Layout/BackgroundImage";
import "../css/index.css";


export default function W21ProjectSeriesPage() {
  return (
    <Layout setGoogleId={id => setGoogleId(id)}>
      <div>
        <BackgroundImage
          source="Background/ocean.jpg"
          missing_source="logo.png"
          title={<a className={"yellowHighlight"}>Winter 2021 Project Series</a>}
          hover={true}
        />
        <hr />

        <div className="w3-content" style={{ maxWidth: 1100, marginBottom: 200}}>
          <W21ProjectSeriesInfo />
        </div>
        <br></br>
      </div>
    </Layout>
  );
}

