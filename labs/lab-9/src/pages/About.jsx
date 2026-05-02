function About() {
  return (
    <div className="about-page" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>About Me</h2>
      <p><strong>Name:</strong> Mohammed Rashid Alharbi</p>
      <p><strong>ID:</strong> 2239457</p>

      <h3 style={{ marginTop: '20px' }}>About This Lab</h3>
      <p>
        Lab 09 focuses on working with APIs in React.js. In this lab, we build a React application
        that allows users to search for recipes and view detailed information including ingredients,
        instructions, and images. It demonstrates how to use the Spoonacular API, manage application state
        with the <code>useState</code> hook, handle side effects and data fetching with the <code>useEffect</code> hook,
        and implement client-side routing using React Router.
      </p>
    </div>
  );
}

export default About;
