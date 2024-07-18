
import React, { FC } from 'react';

import { CheckboxAndRadio } from '@/shared/ui';

import styles from './availability.module.scss';

export const Availability: FC = () => {
	return (
		<>
			<fieldset className={styles.fieldset}>
				<div className={styles.inputContainer}>
					<div className={styles.checkboxContainer}>
						<div className={styles.checkbox}>
							<CheckboxAndRadio
								labelName="10 часов в неделю"
								label="option"
								id="option10hours"
								type="radio"
							/>
						</div>
						<div className={styles.checkbox}>
							<CheckboxAndRadio
								labelName="20 часов в неделю"
								label="option"
								id="option20hours"
								type="radio"
							/>
						</div>
					</div>
					<div>
						<div className={styles.checkbox}>
							<CheckboxAndRadio
								labelName="30 часов в неделю"
								label="option"
								id="option30hours"
								type="radio"
							/>
						</div>
						<CheckboxAndRadio
							labelName="40 часов в неделю"
							label="option"
							id="option40hours"
							type="radio"
						/>
					</div>
				</div>
			</fieldset>
		</>
	);
};