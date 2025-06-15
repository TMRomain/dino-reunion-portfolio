import { Component } from 'react';

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    // Mise à jour de l'état pour afficher l'interface de fallback au prochain rendu
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    // Log de l'erreur pour le débogage
    console.error('WebGL Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Interface de fallback personnalisée
      return this.props.fallback || (
        <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl">
          <div className="text-center p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-orange-500/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Contenu 3D non disponible
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Votre navigateur ne supporte pas WebGL ou il y a un problème avec votre carte graphique.
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>Solutions possibles :</p>
              <p>• Mettez à jour votre navigateur</p>
              <p>• Activez l'accélération matérielle</p>
              <p>• Redémarrez votre navigateur</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default WebGLErrorBoundary;
