import { layerLabels } from '../../../shared/utils/material'

export function HighlightList({ highlights }) {
  return (
    <section className="panel highlight-panel">
      <div className="panel-header">
        <h2>타겟 블록 강조</h2>
        <span>{highlights?.length ?? 0}개</span>
      </div>
      {!highlights?.length ? (
        <p className="empty-copy">현재 감지된 강조 블록이 없습니다.</p>
      ) : (
        <ul className="highlight-list">
          {highlights.map((highlight) => (
            <li key={`${highlight.blockX}-${highlight.blockY}-${highlight.blockZ}-${highlight.layerType}`}>
              <strong>{highlight.material}</strong>
              <span>
                {layerLabels[highlight.layerType]} · {highlight.blockX}, {highlight.blockY},{' '}
                {highlight.blockZ}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
