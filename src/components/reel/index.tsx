function Reel({ title, experiences, selected = false }) {
  const firstFourExperiences = experiences.slice(0, 4);
  const experiencesToRender = selected ? experiences : firstFourExperiences;

  return (
    <article className="experience-reel">
      <div className="experience-reel-head">
        <h2 className="experience-reeel-title h2">{title}</h2>
      </div>
      <div className="experience-reel-body">
        <ul className="experience-reel-list">
          {experiencesToRender.length
            ? experiencesToRender.map(({ id, title, host, img }) => {
                return (
                  <li className="experience-card" key={id}>
                    <div className="experience-card-head">
                      <img className="experience-card-image" src={img} />
                    </div>
                    <div className="experience-card-body">
                      <h3 className="experience-card-title h3">{title}</h3>
                      <p className="experience-card-provider">{`x ${host}`}</p>
                    </div>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </article>
  );
}

export { Reel };
