/*
 * Copyright (C) 2016  Daniel Hsing
 * 				 2016  Max Prettyjohns
 * 				 2015  Sean Burke
 * 				 2015  Ben Ockmore
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import * as bootstrap from 'react-bootstrap';
import * as utilsHelper from '../../../helpers/utils';
import PropTypes from 'prop-types';
import React from 'react';


const {ListGroup, ListGroupItem} = bootstrap;
const {formatDate, isWithinDayFromNow} = utilsHelper;

function EditorRevisionsTab(props) {
	const {editor} = props;
	const {revisions} = editor;

	function renderRevision(revision) {
		const createdDate = new Date(revision.createdAt);
		const dateLabel =
			formatDate(createdDate,
				isWithinDayFromNow(createdDate));
		const header = (
			<h4 className="list-group-item-heading">
				<small className="pull-right">
					{`${editor.name} - ${dateLabel}`}
				</small>
				{`r${revision.id}`}
			</h4>
		);

		return (
			<ListGroupItem
				href={`/revision/${revision.id}`}
				key={`${editor.id}${revision.id}`}
			>
				{header}
				{revision.note}
			</ListGroupItem>
		);
	}

	return (
		<div>
			<h2>Revision History</h2>
			{revisions.length > 0 ?
				<ListGroup>
					{revisions.map(renderRevision)}
				</ListGroup> :
				<h4> No revision to show</h4>
			}
		</div>
	);
}
EditorRevisionsTab.displayName = 'EditorRevisionsTab';
EditorRevisionsTab.propTypes = {
	editor: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		revisions: PropTypes.array
	}).isRequired
};

export default EditorRevisionsTab;
