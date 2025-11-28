export function summarizePrediction(pred){
  if(!pred) return null
  return {label: pred.label || 'Unknown', probability: Math.round((pred.confidence||0)*100)}
}
