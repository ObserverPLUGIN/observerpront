import {
  compactMaterial,
  getMaterialColor,
  layerLabels,
} from '../../../shared/utils/material'

export function LayerMap({ surroundings, activeLayer, errorMessage, onLayerChange }) {
  const currentLayer =
    surroundings?.layers?.find((layer) => layer.type === activeLayer) ??
    surroundings?.layers?.[0] ??
    null

  return (
    <section className="panel map-panel">
      <div className="panel-header">
        <h2>주변 레이어 미니맵</h2>
        <span>{surroundings ? surroundings.playerName : '선택 없음'}</span>
      </div>

      {errorMessage ? <p className="inline-error">{errorMessage}</p> : null}

      {!currentLayer ? (
        <div className="empty-state">
          <p>플레이어를 선택하면 단면 지도가 여기에 표시됩니다.</p>
        </div>
      ) : (
        <>
          <div className="layer-tabs">
            {surroundings.layers.map((layer) => (
              <button
                key={layer.type}
                type="button"
                className={layer.type === currentLayer.type ? 'active' : ''}
                onClick={() => onLayerChange(layer.type)}
              >
                {layer.label ?? layerLabels[layer.type]}
              </button>
            ))}
          </div>

          <div
            className="layer-grid"
            style={{
              gridTemplateColumns: `repeat(${currentLayer.rows[0]?.length ?? 0}, minmax(0, 1fr))`,
            }}
          >
            {currentLayer.rows.flat().map((cell) => {
              const isCenter =
                cell.blockX === surroundings.centerX && cell.blockZ === surroundings.centerZ

              return (
                <div
                  key={`${cell.blockX}-${cell.blockY}-${cell.blockZ}`}
                  className={`grid-cell ${cell.highlighted ? 'highlighted' : ''} ${
                    isCenter ? 'center-cell' : ''
                  }`}
                  title={`${cell.material} @ ${cell.blockX}, ${cell.blockY}, ${cell.blockZ}`}
                  style={{
                    background: getMaterialColor(cell.material, cell.loaded, cell.highlighted),
                  }}
                >
                  <span>{compactMaterial(cell.material)}</span>
                </div>
              )
            })}
          </div>

          <div className="map-legend">
            <span>
              <i className="legend-swatch highlight" />
              타겟 블록
            </span>
            <span>
              <i className="legend-swatch center" />
              플레이어 중심
            </span>
            <span>
              <i className="legend-swatch unloaded" />
              미로드 청크
            </span>
          </div>
        </>
      )}
    </section>
  )
}
