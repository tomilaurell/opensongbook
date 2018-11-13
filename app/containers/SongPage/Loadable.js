/**
 *
 * Asynchronously loads the component for SongPage
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
