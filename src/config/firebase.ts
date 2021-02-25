/**
 *
 * SimpleMenu
 * Copyright (C) 2021 Marvin Schopf
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license AGPL-3.0-or-later
 * @copyright 2021 Marvin Schopf
 *
 */

const firebaseConfig = {
	apiKey: process.env.APP_FIREBASE_API_KEY || "",
	authDomain: process.env.APP_FIREBASE_AUTH_DOMAIN || "",
	projectId: process.env.APP_FIREBASE_PROJECT_ID || "",
	storageBucket: process.env.APP_FIREBASE_STORAGE_BUCKET || "",
	messagingSenderId: process.env.APP_FIREBASE_MESSAGING_SENDER_ID || "",
	appId: process.env.APP_FIREBASE_APP_ID || "",
	databaseURL: process.env.APP_FIREBASE_DATABASE_URL || "",
}

export default firebaseConfig
