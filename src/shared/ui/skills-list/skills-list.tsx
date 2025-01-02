import React from 'react';
import { TSkillsList } from './types';
import styles from './skills-list.module.scss';

export const SkillsList: React.FC<TSkillsList> = ({ skills }) => {
	return (
		<ul className={styles.list}>
			{skills.map((skill, index) => (
				<li className={styles.list__item} key={index}>
					{skill.name}
				</li>
			))}
		</ul>
	);
};
