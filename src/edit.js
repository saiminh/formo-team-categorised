import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import previewImage from './assets/previewimage.jpg';

export default function Edit() {
	return (
		<div { ...useBlockProps() }>
      <img className='formo-team-categorised-previewImage' src={ previewImage } alt="" />
      <div className='formo-team-categorised-previewText'>
        <div className='formo-team-categorised-previewText-inner'>
          <h3 className='formo-team-categorised-previewText-header'>
          { __(
              'This is the formo team categorised block',
              'formo-team-categorised'
            ) }
          </h3>
          <p>
            { __(
              'It pulls in team members from the formo teammember post type and displays them in a categorised format. You can\'t edit this block in the editor.',
              'formo-team-categorised'
            ) }
          </p>
          <p>
            { __(
              'You can change the images, names, info and categories of each team member in the team members section of the admin panel.',
              'formo-team-categorised'
            ) }
          </p>
        </div>
      </div>
		</div>
	);
}
